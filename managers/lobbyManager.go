package managers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"latvianKeyboardTypingPlatform/types"
	"log"
	"sort"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type LobbyManager struct {
	globalMu    sync.RWMutex
	Lobbies     map[string]*types.LobbyWithLock
	Connections map[string][]*websocket.Conn
	TimeLeft    map[string]int
}

func NewLobbyManager() *LobbyManager {
	return &LobbyManager{
		Lobbies:     make(map[string]*types.LobbyWithLock),
		Connections: make(map[string][]*websocket.Conn),
		TimeLeft:    make(map[string]int),
	}
}

func (lm *LobbyManager) HandleError(ws *websocket.Conn, err error, lobbyID string) error {
	errorMsg := types.WebSocketMessage{
		Type:    types.Error,
		LobbyId: lobbyID,
		Data: map[string]interface{}{
			"error": err.Error(),
		},
	}

	if err := ws.WriteJSON(errorMsg); err != nil {
		log.Printf("Error sending error response: %v\n", err)
		return err
	}

	return nil
}

func (lm *LobbyManager) HandleConnectionClose(ws *websocket.Conn) {
	lm.globalMu.Lock()
	defer lm.globalMu.Unlock()

	for lobbyID, conns := range lm.Connections {
		for i, conn := range conns {
			if conn == ws {
				// remove the connection from the lobby
				lm.Connections[lobbyID] = append(conns[:i], conns[i+1:]...)

				// if lobby is empty, clean it up
				if len(lm.Connections[lobbyID]) == 0 {
					delete(lm.Connections, lobbyID)
					delete(lm.Lobbies, lobbyID)
				}
				return
			}
		}
	}
}

func (lm *LobbyManager) Broadcast(msg *types.WebSocketMessage) error {

	lm.globalMu.Lock()
	conns, exists := lm.Connections[msg.LobbyId]
	if !exists {
		return nil
	}

	lm.globalMu.Unlock()

	for _, conn := range conns {
		if err := conn.WriteJSON(msg); err != nil {
			return fmt.Errorf("error broadcasting to connection: %w", err)
		}
	}

	return nil
}

func (lm *LobbyManager) HandleCreateLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	var lobbyId string
	for {
		lobbyId = uuid.New().String()
		if _, exists := lm.Lobbies[lobbyId]; !exists {
			break
		}
	}

	if message.Data == nil {
		return nil, fmt.Errorf("message.Data is nil")
	}

	data, ok := message.Data.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("invalid data format")
	}

	lobbySettingsRaw, ok := data["lobbySettings"].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("lobbySettings is required and should be an object")
	}

	text, ok := lobbySettingsRaw["text"].(string)
	if !ok {
		return nil, fmt.Errorf("text is required and should be a string")
	}

	textType, ok := lobbySettingsRaw["textType"].(string)
	if !ok {
		return nil, fmt.Errorf("text type is required and should be a string")
	}

	var customText *string
	if val, ok := lobbySettingsRaw["customText"].(string); ok {
		customText = &val
	} else {
		customText = nil
	}

	var textId *int
	if textIdFloat, ok := lobbySettingsRaw["textid"].(float64); ok {
		textIdValue := int(textIdFloat)
		textId = &textIdValue
	} else {
		textId = nil
	}

	timeFloat, ok := lobbySettingsRaw["time"].(float64)
	if !ok {
		return nil, fmt.Errorf("time is required and should be a number")
	}
	time := int(timeFloat)

	maxPlayerCountFloat, ok := lobbySettingsRaw["maxPlayerCount"].(float64)
	if !ok {
		return nil, fmt.Errorf("maxPlayerCount is required and should be a number")
	}
	maxPlayerCount := int(maxPlayerCountFloat)

	playerRaw, ok := data["players"].([]interface{})
	if !ok || len(playerRaw) != 1 {
		return nil, fmt.Errorf("players must be an array with one player object")
	}

	playerData, ok := playerRaw[0].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("each player should be an object")
	}

	username, ok := playerData["username"].(string)
	if !ok {
		return nil, fmt.Errorf("username is required and should be a string")
	}
	var userId *string
	if val, ok := playerData["userId"].(string); ok {
		userId = &val
	} else {
		userId = nil
	}
	owner := types.Player{
		PlayerId:     uuid.NewString(),
		Username:     username,
		UserId:       userId,
		Role:         types.PlayerRoleLeader,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
	}

	lobby := &types.LobbyWithLock{
		LobbyId:     lobbyId,
		Players:     []types.Player{owner},
		LobbyStatus: types.LobbyStatusWaiting,
		LobbySettings: types.LobbySettings{
			Text:           text,
			TextType:       textType,
			Time:           time,
			MaxPlayerCount: maxPlayerCount,
			CustomText:     customText,
			TextId:         textId,
		},
	}

	if lm.Lobbies == nil {
		lm.Lobbies = make(map[string]*types.LobbyWithLock)
	}
	lm.globalMu.Lock()

	lm.Lobbies[lobbyId] = lobby

	if lm.Connections == nil {
		lm.Connections = make(map[string][]*websocket.Conn)
	}

	lm.Connections[lobbyId] = []*websocket.Conn{conn}
	lm.globalMu.Unlock()

	broadcastMessage := &types.WebSocketMessage{
		Type:    types.CreateLobby,
		LobbyId: lobby.LobbyId,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
		},
	}

	if err := lm.Broadcast(broadcastMessage); err != nil {
		return nil, fmt.Errorf("error broadcasting lobby creation: %v", err)
	}

	return broadcastMessage, nil
}

func (lm *LobbyManager) HandleJoinLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	if message.LobbyId == "" {
		return nil, fmt.Errorf("lobby ID is required")
	}

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby with ID %s does not exist", lobbyId)
	}

	if len(lobby.Players) >= lobby.LobbySettings.MaxPlayerCount {
		return nil, fmt.Errorf("lobby %s is full", lobbyId)
	}

	if message.Data == nil {
		return nil, fmt.Errorf("message.Data is nil")
	}

	data, ok := message.Data.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("invalid data format")
	}

	playersRaw, ok := data["players"].([]interface{})
	if !ok || len(playersRaw) != 1 {
		return nil, fmt.Errorf("players must be an array with one player object")
	}

	playerData, ok := playersRaw[0].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("player data should be an object")
	}

	username, ok := playerData["username"].(string)
	if !ok {
		return nil, fmt.Errorf("username is required and should be a string")
	}

	var userId *string
	if val, ok := playerData["userId"].(string); ok {
		userId = &val
	} else {
		userId = nil
	}

	player := types.Player{
		PlayerId:     uuid.NewString(),
		Username:     username,
		UserId:       userId,
		Role:         types.PlayerRolePlayer,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
	}
	lm.globalMu.Lock()
	lobby.Players = append(lobby.Players, player)

	lm.Connections[lobbyId] = append(lm.Connections[lobbyId], conn)

	lm.Lobbies[message.LobbyId] = lobby

	lm.globalMu.Unlock()
	broadcastMessage := &types.WebSocketMessage{
		Type:    types.JoinLobby,
		LobbyId: lobbyId,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
		},
	}

	if err := lm.Broadcast(broadcastMessage); err != nil {
		return nil, fmt.Errorf("error broadcasting lobby join: %v", err)
	}

	return broadcastMessage, nil
}

func (lm *LobbyManager) HandleStartRace(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[message.LobbyId]

	if !exists {
		lm.globalMu.RUnlock()
		return nil, fmt.Errorf("lobby %s not found", message.LobbyId)
	}
	lm.globalMu.RUnlock()

	lm.globalMu.Lock()
	lm.TimeLeft[message.LobbyId] = lobby.LobbySettings.Time
	lm.globalMu.Unlock()

	// start the countdown in a separate goroutine
	go lm.startCountdown(message.LobbyId)

	return nil, nil
}

func (lm *LobbyManager) allPlayersFinishedTyping(lobbyId string) bool {
	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyId]
	lm.globalMu.RUnlock()

	if !exists {
		return false
	}

	lobby.LobbyMu.RLock()
	defer lobby.LobbyMu.RUnlock()

	for _, player := range lobby.Players {
		if !player.FinishedTyping {
			return false
		}
	}

	return true
}

func (lm *LobbyManager) SaveRaceResults(lobbyId string) error {

	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyId]
	lm.globalMu.RUnlock()

	if !exists {
		return fmt.Errorf("lobby with id %s not found", lobbyId)
	}

	lobby.LobbyMu.RLock()
	defer lobby.LobbyMu.RUnlock()

	lobbySettings := types.LobbySettings{
		TextType:       lobby.LobbySettings.TextType,
		TextId:         lobby.LobbySettings.TextId,
		CustomText:     lobby.LobbySettings.CustomText,
		MaxPlayerCount: lobby.LobbySettings.MaxPlayerCount,
		Time:           lobby.LobbySettings.Time,
	}

	lobbyy := types.Lobby{
		LobbyId:         lobby.LobbyId,
		LobbySettingsId: lobby.LobbySettingsId,
		Date:            time.Now().Format(time.RFC3339),
	}

	var lobbyPlayers []types.Player
	for _, player := range lobby.Players {
		lobbyPlayers = append(lobbyPlayers, types.Player{
			PlayerId:              player.PlayerId,
			LobbyId:               lobbyy.LobbyId,
			Username:              player.Username,
			UserId:                player.UserId,
			Role:                  player.Role,
			Place:                 player.Place,
			MistakeCount:          player.MistakeCount,
			Wpm:                   player.Wpm,
			PercentageOfTextTyped: player.PercentageOfTextTyped,
			LobbySettingsid:       0, // this later changes when we get serial id from db
		})
	}

	err := queries.PostTypingRace(&lobbyy, lobbySettings, lobbyPlayers)
	if err != nil {
		return fmt.Errorf("[SaveRaceResults] Failed to save race results for Lobby ID %s: %v", lobbyId, err)
	}

	return nil
}

func (lm *LobbyManager) startCountdown(lobbyId string) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			lm.globalMu.Lock()
			lm.TimeLeft[lobbyId]--
			timeLeft := lm.TimeLeft[lobbyId]

			lobby, exists := lm.Lobbies[lobbyId]
			if !exists {
				lm.globalMu.Unlock()
				return
			}

			lobby.LobbyMu.RLock()
			allFinished := true
			for _, player := range lobby.Players {
				if !player.FinishedTyping {
					allFinished = false
					break
				}
			}
			lobby.LobbyMu.RUnlock()

			if allFinished || timeLeft <= 0 {
				endRaceMessage := &types.WebSocketMessage{
					Type:    types.EndRace,
					LobbyId: lobbyId,
					Data: types.EndRaceData{
						Players: lobby.Players,
					},
				}

				if err := lm.Broadcast(endRaceMessage); err != nil {
					fmt.Printf("Error broadcasting end race: %v\n", err)
				}

				go func() {
					err := lm.SaveRaceResults(lobbyId)
					if err != nil {
						fmt.Printf("Error saving race results: %v\n", err)
					} else {
						fmt.Printf("Race results saved successfully for Lobby ID: %s\n", lobbyId)
					}
				}()

				lm.globalMu.Unlock()
				return
			}

			timeLeftMessage := &types.WebSocketMessage{
				Type:    types.TimeLeft,
				LobbyId: lobbyId,
				Data: types.TimeLeftData{
					TimeLeft: timeLeft,
				},
			}

			if err := lm.Broadcast(timeLeftMessage); err != nil {
				fmt.Printf("Error broadcasting time left: %v\n", err)
			}
			lm.globalMu.Unlock()
		}
	}
}

func (lm *LobbyManager) HandleProgress(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	if message.LobbyId == "" {
		return nil, fmt.Errorf("lobby ID is required")
	}

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	data, ok := message.Data.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("invalid data format")
	}

	playersRaw, ok := data["players"].([]interface{})
	if !ok || len(playersRaw) != 1 {
		return nil, fmt.Errorf("players must be an array with one player object")
	}

	playerData, ok := playersRaw[0].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("player data should be an object")
	}

	wpmFloat, ok := playerData["wpm"].(float64)
	if !ok {
		return nil, fmt.Errorf("wpm is required and should be a number")
	}
	wpm := int(wpmFloat)

	mistakeCountFloat, ok := playerData["mistakeCount"].(float64)
	if !ok {
		return nil, fmt.Errorf("mistakes are required and should be a number")
	}
	mistakeCount := int(mistakeCountFloat)

	percentageOfTextTypedFloat, ok := playerData["percentageOfTextTyped"].(float64)
	if !ok {
		return nil, fmt.Errorf("percentageOfTextTyped is required and should be a number")
	}
	percentageOfTextTyped := int(percentageOfTextTypedFloat)

	playerId, ok := playerData["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required and should be a string")
	}

	lobby.LobbyMu.Lock()

	// find and update player data
	for i, player := range lobby.Players {
		if player.PlayerId == playerId {
			lobby.Players[i].Wpm = wpm
			lobby.Players[i].MistakeCount = mistakeCount
			lobby.Players[i].PercentageOfTextTyped = percentageOfTextTyped
			if percentageOfTextTyped == 100 {
				lobby.Players[i].FinishedTyping = true
			}
			break
		}
	}

	// recalculate the player's place based on highest percentageOfTextTyped
	// sort players in descending order of percentageOfTextTyped
	sort.Slice(lobby.Players, func(i, j int) bool {
		return lobby.Players[i].PercentageOfTextTyped > lobby.Players[j].PercentageOfTextTyped
	})

	// assign place based on the sorted order
	for i := range lobby.Players {
		lobby.Players[i].Place = i + 1
	}

	lm.Lobbies[message.LobbyId] = lobby
	lobby.LobbyMu.Unlock()

	broadcastMessage := &types.WebSocketMessage{
		LobbyId: lobbyId,
		Type:    types.Progess,
		Data: types.ProgressData{
			Players: lobby.Players,
		},
	}

	if err := lm.Broadcast(broadcastMessage); err != nil {
		return nil, fmt.Errorf("error broadcasting lobby join: %v", err)
	}

	return broadcastMessage, nil
}
