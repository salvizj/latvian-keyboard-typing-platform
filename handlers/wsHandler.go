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
		return true // for development allow all
	},
}

func WsHandler(c echo.Context, manager *managers.LobbyManager) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
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
				for lobbyId, conns := range manager.Connections {
					for i, conn := range conns {
						if conn == ws {

							// slice all connections before and after faulty conn
							manager.Connections[lobbyId] = append(conns[:i], conns[i+1:]...)

							// ff the lobby has no remaining connections after the removal
							if len(manager.Connections[lobbyId]) == 0 {

								delete(manager.Connections, lobbyId)
								delete(manager.Lobbies, lobbyId)
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

		switch msg.Type {
		case types.CreateLobby:
			response, handlerErr = manager.HandleCreateLobby(msg, ws)
		case types.JoinLobby:
			response, handlerErr = manager.HandleJoinLobby(msg, ws)
		case types.StartGame:
			response, handlerErr = manager.HandleStartGame(msg, ws)
		case types.EndGame:
			response, handlerErr = manager.HandleEndGame(msg, ws)
		default:
			handlerErr = fmt.Errorf("unknown message type: %s", msg.Type)
		}

		// respond to client with error
		if handlerErr != nil {
			errorMsg := types.WebSocketMessage{
				Type:    types.Error,
				LobbyId: msg.LobbyId,
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
			if conns, exists := manager.Connections[msg.LobbyId]; exists {
				for _, conn := range conns {
					if err := conn.WriteJSON(response); err != nil {
						return fmt.Errorf("error broadcasting to connection: %w", err)
					}
				}
			}
		}
	}
}
