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
	mu          sync.RWMutex
	Lobbies     map[string]*types.Lobby
	Connections map[string][]*websocket.Conn
	TimeLeft    map[string]int
}

func NewLobbyManager() *LobbyManager {
	return &LobbyManager{
		Lobbies:     make(map[string]*types.Lobby),
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
	lm.mu.Lock()
	defer lm.mu.Unlock()

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
	conns, exists := lm.Connections[msg.LobbyId]
	if !exists {
		return nil
	}

	for _, conn := range conns {
		if err := conn.WriteJSON(msg); err != nil {
			return fmt.Errorf("error broadcasting to connection: %w", err)
		}
	}

	return nil
}

func (lm *LobbyManager) HandleCreateLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

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

	userId, ok := playerData["userId"].(string)
	if !ok {
		userId = ""
	}

	// initialize the owner player
	owner := types.Player{
		PlayerId:     uuid.NewString(),
		Username:     username,
		UserId:       userId,
		Role:         types.PlayerRoleLeader,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
	}

	// initialize the lobby
	lobby := &types.Lobby{
		LobbyId:     lobbyId,
		Players:     []types.Player{owner},
		LobbyStatus: types.LobbyStatusWaiting,
		LobbySettings: types.LobbySettings{
			Text:           text,
			Time:           time,
			MaxPlayerCount: maxPlayerCount,
		},
	}

	// save the lobby and connection
	if lm.Lobbies == nil {
		lm.Lobbies = make(map[string]*types.Lobby)
	}

	lm.Lobbies[lobbyId] = lobby

	if lm.Connections == nil {
		lm.Connections = make(map[string][]*websocket.Conn)
	}

	lm.Connections[lobbyId] = []*websocket.Conn{conn}

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
	lm.mu.Lock()
	defer lm.mu.Unlock()

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

	userId, ok := data["userId"].(string)
	if !ok {
		userId = ""
	}

	// initiate player
	player := types.Player{
		PlayerId:     uuid.NewString(),
		Username:     username,
		UserId:       userId,
		Role:         types.PlayerRolePlayer,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
	}
	// add player to lobby
	lobby.Players = append(lobby.Players, player)

	// append player conn to lobby
	lm.Connections[lobbyId] = append(lm.Connections[lobbyId], conn)

	lm.Lobbies[message.LobbyId] = lobby

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
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby %s not found", lobbyId)
	}

	// get initial time from the lobby settings
	initialTime := lobby.LobbySettings.Time

	lm.TimeLeft[lobbyId] = initialTime

	// start the countdown in a separate goroutine
	go lm.startCountdown(lobbyId)

	return nil, nil
}

func (lm *LobbyManager) allPlayersFinishedTyping(lobbyId string) bool {
	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return false
	}

	for _, player := range lobby.Players {
		if !player.FinishedTyping {
			return false
		}
	}

	return true
}

func (lm *LobbyManager) SaveRaceResults(lobbyId string) error {
	lm.mu.RLock()
	defer lm.mu.RUnlock()

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return fmt.Errorf("lobby with id %s not found", lobbyId)
	}

	lobbySettings := types.LobbySettings{
		TextType:       lobby.LobbySettings.TextType,
		TextId:         lobby.LobbySettings.TextId,
		CustomText:     lobby.LobbySettings.CustomText,
		MaxPlayerCount: lobby.LobbySettings.MaxPlayerCount,
		Time:           lobby.LobbySettings.Time,
	}

	lobbyy := types.Lobby{
		LobbyId:         lobby.LobbyId,
		LobbySettingsId: 0,
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
			LobbySettingsid:       lobbySettings.LobbySettingsId,
		})
	}

	fmt.Println("Lobby Settings:", lobbySettings)

	err := queries.PostTypingRace(lobbyy, lobbySettings, lobbyPlayers)
	if err != nil {
		return fmt.Errorf("failed to save race results: %v", err)
	}

	return nil
}

func (lm *LobbyManager) startCountdown(lobbyId string) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			lm.mu.Lock()
			lm.TimeLeft[lobbyId]--
			timeLeft := lm.TimeLeft[lobbyId]

			lobby, exists := lm.Lobbies[lobbyId]
			if !exists {
				lm.mu.Unlock()
				return
			}

			allFinished := lm.allPlayersFinishedTyping(lobbyId)
			if allFinished || timeLeft <= 0 {
				fmt.Printf("All players finished typing: %v\n", allFinished)
				fmt.Printf("Time left: %d\n", timeLeft)

				err := lm.SaveRaceResults(lobbyId)
				if err != nil {
					fmt.Printf("Error saving race results: %v\n", err)
				}

				endRaceMessage := &types.WebSocketMessage{
					Type:    types.EndRace,
					LobbyId: lobbyId,
					Data: types.EndRaceData{
						Players: lobby.Players,
					},
				}
				lm.mu.Unlock()

				lm.mu.RLock()
				connections := lm.Connections[lobbyId]
				lm.mu.RUnlock()

				for _, conn := range connections {
					err := conn.WriteJSON(endRaceMessage)
					if err != nil {
						fmt.Printf("Error sending endRace message to player: %v\n", err)
					}
				}

				return
			}

			timeLeftMessage := &types.WebSocketMessage{
				Type:    types.TimeLeft,
				LobbyId: lobbyId,
				Data: types.TimeLeftData{
					TimeLeft: timeLeft,
				},
			}

			lm.mu.Unlock()

			lm.mu.RLock()
			connections := lm.Connections[lobbyId]
			lm.mu.RUnlock()

			for _, conn := range connections {
				err := conn.WriteJSON(timeLeftMessage)
				if err != nil {
					fmt.Printf("Error sending timeLeft message to player: %v\n", err)
				}
			}
		}
	}
}

func (lm *LobbyManager) HandleProgress(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	if message.LobbyId == "" {
		return nil, fmt.Errorf("lobby ID is required")
	}

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	// Validate and extract the player data from the message
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
