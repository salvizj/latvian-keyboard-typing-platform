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
		return true
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
		err := ws.ReadJSON(&msg)
		if err != nil {
			// handle unexpected close and cleanup
			if websocket.IsUnexpectedCloseError(err) {
				manager.HandleConnectionClose(ws)
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
		default:
			handlerErr = fmt.Errorf("unknown message type: %s", msg.Type)
		}

		// handle any errors that occurred during message processing
		if handlerErr != nil {
			log.Printf("Error handling message: %v", handlerErr)
			lobbyID := ""
			if response != nil {
				lobbyID = response.LobbyId
			}

			if err := manager.HandleError(ws, handlerErr, lobbyID); err != nil {
				log.Printf("Error sending error response: %v\n", err)
				return err
			}
			continue
		}
	}
}
