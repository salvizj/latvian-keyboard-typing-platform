package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/managers"
	"latvianKeyboardTypingPlatform/types"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // for development allow all
	},
}

func WsHandler(c echo.Context, manager *managers.LobbyManager) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println("Failed to upgrade connection:", err)
		return err
	}
	defer ws.Close()

	// main message handling loop
	for {
		var msg types.WebSocketMessage
		// read ws message and stores in msg and assign err if find any
		err := ws.ReadJSON(&msg)

		// if we find err and it is from unexpected close we remove conn and possibly entire lobby
		if err != nil {
			if websocket.IsUnexpectedCloseError(err) {
				handleConnectionClose(manager, ws)
			}
			return nil
		}

		var response *types.WebSocketMessage
		var handlerErr error

		// handle the message based on its type
		switch msg.Type {
		case types.CreateLobby:
			response, handlerErr = manager.HandleCreateLobby(msg, ws)
		case types.JoinLobby:
			response, handlerErr = manager.HandleJoinLobby(msg, ws)
		case types.StartRace:
			response, handlerErr = manager.HandleStartRace(msg, ws)
		case types.Progess:
			response, handlerErr = manager.HandleProgress(msg, ws)
		case types.EndRace:
			response, handlerErr = manager.HandleEndRace(msg, ws)
		default:
			handlerErr = fmt.Errorf("unknown message type: %s", msg.Type)
		}

		// handle any errors that occurred during message processing
		if handlerErr != nil {
			lobbyID := ""
			if response != nil {
				lobbyID = response.LobbyId
			}

			errorMsg := types.WebSocketMessage{
				Type:    types.Error,
				LobbyId: lobbyID,
				Data: map[string]interface{}{
					"error": handlerErr.Error(),
				},
			}

			if err := ws.WriteJSON(errorMsg); err != nil {
				log.Printf("Error sending error response: %v\n", err)
				return err
			}
			continue
		}

		// broadcast the response if it exists
		if response != nil && response.LobbyId != "" {
			if err := broadcastToLobby(manager, response); err != nil {
				log.Printf("Error broadcasting message: %v\n", err)
				return err
			}
		}
	}
}

// handleConnectionClose handles cleanup when a connection is closed
func handleConnectionClose(manager *managers.LobbyManager, ws *websocket.Conn) {
	for lobbyID, conns := range manager.Connections {
		for i, conn := range conns {
			if conn == ws {
				// Remove the connection from the lobby
				manager.Connections[lobbyID] = append(conns[:i], conns[i+1:]...)

				// If lobby is empty, clean it up
				if len(manager.Connections[lobbyID]) == 0 {
					delete(manager.Connections, lobbyID)
					delete(manager.Lobbies, lobbyID)
				}
				return
			}
		}
	}
}

// broadcastToLobby broadcasts a message to all connections in a lobby
func broadcastToLobby(manager *managers.LobbyManager, msg *types.WebSocketMessage) error {
	conns, exists := manager.Connections[msg.LobbyId]
	if !exists {
		log.Printf("No connections found for lobbyId: %s\n", msg.LobbyId)
		return nil
	}

	for _, conn := range conns {
		if err := conn.WriteJSON(msg); err != nil {
			return fmt.Errorf("error broadcasting to connection: %w", err)
		}
	}
	return nil
}
