package handlers

import (
	"fmt"
	"latvian-typing-tutor/managers"
	"latvian-typing-tutor/types"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WsHandler(c echo.Context, manager *managers.LobbyManager) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	// Main message handling loop
	for {
		var msg types.WebSocketMessage
		err := ws.ReadJSON(&msg)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err) {
				// Find and remove the connection from the appropriate lobby
				for lobbyID, conns := range manager.Connections {
					for i, conn := range conns {
						if conn == ws {
							manager.Connections[lobbyID] = append(conns[:i], conns[i+1:]...)
							if len(manager.Connections[lobbyID]) == 0 {
								delete(manager.Connections, lobbyID)
								delete(manager.Lobbies, lobbyID)
							}
							break
						}
					}
				}
			}
			return nil
		}

		var response *types.WebSocketMessage
		var handlerErr error

		// route message to appropriate handler
		switch msg.Type {
		case types.CreateLobby:
			response, handlerErr = manager.HandleCreateLobby(msg.LobbyID, msg.Data, ws)
		case types.JoinLobby:
			response, handlerErr = manager.HandleJoinLobby(msg.LobbyID, msg.Data, ws)
		case types.UpdateLobbySettings:
			response, handlerErr = manager.HandleUpdateSettings(msg.LobbyID, msg.Data)
		case types.PlayerUpdate:
			response, handlerErr = manager.HandlePlayerUpdate(msg.LobbyID, msg.Data)
		case types.StartGame:
			response, handlerErr = manager.HandleStartGame(msg.LobbyID, msg.Data)
		case types.EndGame:
			response, handlerErr = manager.HandleEndGame(msg.LobbyID, msg.Data)
		default:
			handlerErr = fmt.Errorf("unknown message type: %s", msg.Type)
		}

		if handlerErr != nil {
			errorMsg := types.WebSocketMessage{
				Type:    types.Error,
				LobbyID: msg.LobbyID,
				Data: map[string]interface{}{
					"error": handlerErr.Error(),
				},
			}
			if err := ws.WriteJSON(errorMsg); err != nil {
				return err
			}
			continue
		}

		if response != nil {
			// broadcast the response to all connections in the lobby
			if conns, exists := manager.Connections[msg.LobbyID]; exists {
				for _, conn := range conns {
					if err := conn.WriteJSON(response); err != nil {
						return fmt.Errorf("error broadcasting to connection: %w", err)
					}
				}
			}
		}
	}
}
