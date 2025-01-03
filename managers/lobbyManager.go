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

// LobbyManager manages multiple lobbies, handling concurrency and tracking lobby states, connections, and remaining time.
type LobbyManager struct {
	globalMu sync.RWMutex
	Lobbies  map[string]*types.LobbyWithLock
	TimeLeft map[string]int
}

// NewLobbyManager initialize function to make LobbyManager
func NewLobbyManager() *LobbyManager {
	return &LobbyManager{
		Lobbies:  make(map[string]*types.LobbyWithLock),
		TimeLeft: make(map[string]int),
	}
}

// HandleError handles websocket errors
func (lm *LobbyManager) HandleError(ws *websocket.Conn, err error, lobbyID string) error {
	errorMsg := types.WebSocketMessage{
		Type:    types.Error,
		LobbyID: lobbyID,
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

// HandleConnectionClose closes closed connection and removes lobbies and connections if empty
func (lm *LobbyManager) HandleConnectionClose(ws *websocket.Conn) {
	lm.globalMu.Lock()
	defer lm.globalMu.Unlock()

	for lobbyID, lobby := range lm.Lobbies {
		for i, player := range lobby.Players {
			if player.Connection == ws {

				// remove player
				lobby.Players = append(lobby.Players[:i], lobby.Players[i+1:]...)

				leftLobbyMessage := &types.WebSocketMessage{
					Type:    types.LeftLobby,
					LobbyID: lobbyID,
					Data: types.LeftLobbyData{
						Players: lobby.Players,
					},
				}

				if err := lm.Broadcast(leftLobbyMessage); err != nil {
					fmt.Println("Error broadcasting message:", err)
				}

				// delete empty lobby
				if len(lobby.Players) == 0 {
					delete(lm.Lobbies, lobbyID)
				}
				return
			}
		}
	}
}

// FindPlayer find player based on id
func (lm *LobbyManager) FindPlayer(lobby *types.Lobby, playerID string) (int, *types.Player) {
	for i, p := range lobby.Players {
		if p.PlayerID == playerID {
			return i, &lobby.Players[i]
		}
	}
	return -1, nil
}

// Broadcast broadcasts websocket messages to all players in the lobby
func (lm *LobbyManager) Broadcast(msg *types.WebSocketMessage) error {
	lobby, exists := lm.Lobbies[msg.LobbyID]
	if !exists {
		return nil
	}

	// iterate through all players in the lobby and send the message to each player's connection
	for _, player := range lobby.Players {
		if err := player.Connection.WriteJSON(msg); err != nil {
			return fmt.Errorf("error broadcasting to player %s in lobby %s: %w", player.PlayerID, msg.LobbyID, err)
		}
	}

	return nil
}

// HandleCreateLobby function to handle lobby creation
func (lm *LobbyManager) HandleCreateLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	var lobbyID string
	for {
		lobbyID = uuid.New().String()
		lm.globalMu.RLock()
		if _, exists := lm.Lobbies[lobbyID]; !exists {
			lm.globalMu.RUnlock()
			break
		}
		lm.globalMu.RUnlock()
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

	var textID *int
	if textIDFloat, ok := lobbySettingsRaw["textId"].(float64); ok {
		textIDValue := int(textIDFloat)
		textID = &textIDValue
	} else {
		textID = nil
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
	var userID *string
	if val, ok := playerData["userId"].(string); ok {
		userID = &val
	} else {
		userID = nil
	}
	owner := types.Player{
		PlayerID:     uuid.NewString(),
		Username:     username,
		UserID:       userID,
		Role:         types.PlayerRoleLeader,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
		Connection:   conn,
	}

	lobby := &types.LobbyWithLock{
		LobbyID:     lobbyID,
		Players:     []types.Player{owner},
		LobbyStatus: types.LobbyStatusWaiting,
		LobbySettings: types.LobbySettings{
			Text:           text,
			TextType:       textType,
			Time:           time,
			MaxPlayerCount: maxPlayerCount,
			CustomText:     customText,
			TextID:         textID,
		},
	}

	if lm.Lobbies == nil {
		lm.Lobbies = make(map[string]*types.LobbyWithLock)
	}

	lm.globalMu.Lock()
	lm.Lobbies[lobbyID] = lobby

	lm.globalMu.Unlock()

	broadcastMessage := &types.WebSocketMessage{
		Type:    types.CreateLobby,
		LobbyID: lobby.LobbyID,
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

// HandleJoinLobby handles lobby joining
func (lm *LobbyManager) HandleJoinLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	if message.LobbyID == "" {
		return nil, fmt.Errorf("lobby ID is required")
	}

	lobbyID := message.LobbyID

	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyID]

	if !exists {

		lm.globalMu.RUnlock()
		return nil, fmt.Errorf("lobby with ID %s does not exist", lobbyID)
	}
	lm.globalMu.RUnlock()

	if len(lobby.Players) >= lobby.LobbySettings.MaxPlayerCount {
		return nil, fmt.Errorf("lobby %s is full", lobbyID)
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

	var userID *string
	if val, ok := playerData["userId"].(string); ok {
		userID = &val
	} else {
		userID = nil
	}

	player := types.Player{
		PlayerID:     uuid.NewString(),
		Username:     username,
		UserID:       userID,
		Role:         types.PlayerRolePlayer,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
		Connection:   conn,
	}
	lm.globalMu.Lock()
	lobby.Players = append(lobby.Players, player)

	lm.Lobbies[message.LobbyID] = lobby
	lm.globalMu.Unlock()

	lobby.LobbyMu.RLock()
	broadcastMessage := &types.WebSocketMessage{
		Type:    types.JoinLobby,
		LobbyID: lobbyID,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
		},
	}
	lobby.LobbyMu.RUnlock()

	if err := lm.Broadcast(broadcastMessage); err != nil {
		return nil, fmt.Errorf("error broadcasting lobby join: %v", err)
	}

	return broadcastMessage, nil
}

// HandleStartRace functon to start race
func (lm *LobbyManager) HandleStartRace(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[message.LobbyID]

	if !exists {
		return nil, fmt.Errorf("lobby %s not found", message.LobbyID)
	}

	lm.TimeLeft[message.LobbyID] = lobby.LobbySettings.Time
	lm.globalMu.RUnlock()

	// start the countdown in a separate goroutine
	go lm.startCountdown(message.LobbyID)

	return nil, nil
}

func (lm *LobbyManager) allPlayersFinishedTyping(lobbyID string) bool {
	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyID]

	if !exists {
		lm.globalMu.RUnlock()
		return false
	}
	lm.globalMu.RUnlock()

	lobby.LobbyMu.RLock()
	defer lobby.LobbyMu.RUnlock()

	for _, player := range lobby.Players {
		if !player.FinishedTyping {
			return false
		}
	}

	return true
}

// SaveRaceResults to save race results
func (lm *LobbyManager) SaveRaceResults(lobbyID string) error {

	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyID]

	if !exists {
		lm.globalMu.RUnlock()
		return fmt.Errorf("lobby with id %s not found", lobbyID)
	}

	lm.globalMu.RUnlock()

	lobby.LobbyMu.RLock()
	defer lobby.LobbyMu.RUnlock()

	lobbySettings := types.LobbySettings{
		TextType:       lobby.LobbySettings.TextType,
		TextID:         lobby.LobbySettings.TextID,
		CustomText:     lobby.LobbySettings.CustomText,
		MaxPlayerCount: lobby.LobbySettings.MaxPlayerCount,
		Time:           lobby.LobbySettings.Time,
	}

	lobbyy := types.Lobby{
		LobbyID:         lobby.LobbyID,
		LobbySettingsID: lobby.LobbySettingsID,
		Date:            time.Now().Format(time.RFC3339),
	}

	var lobbyPlayers []types.Player
	for _, player := range lobby.Players {
		lobbyPlayers = append(lobbyPlayers, types.Player{
			PlayerID:              player.PlayerID,
			LobbyID:               lobbyy.LobbyID,
			Username:              player.Username,
			UserID:                player.UserID,
			Role:                  player.Role,
			Place:                 player.Place,
			MistakeCount:          player.MistakeCount,
			Wpm:                   player.Wpm,
			PercentageOfTextTyped: player.PercentageOfTextTyped,
		})
	}

	err := queries.PostTypingRace(&lobbyy, lobbySettings, lobbyPlayers)
	if err != nil {
		return fmt.Errorf("[SaveRaceResults] Failed to save race results for Lobby ID %s: %v", lobbyID, err)
	}

	return nil
}

func (lm *LobbyManager) startCountdown(lobbyID string) {
	ticker := time.NewTicker(1 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		lm.globalMu.Lock()
		lobby, exists := lm.Lobbies[lobbyID]

		if !exists {
			lm.globalMu.Unlock()
			return
		}

		lm.TimeLeft[lobbyID]--
		timeLeft := lm.TimeLeft[lobbyID]
		lm.globalMu.Unlock()

		lobby.LobbyMu.RLock()
		allFinished := lm.allPlayersFinishedTyping(lobbyID)
		lobby.LobbyMu.RUnlock()

		if allFinished || timeLeft <= 0 {
			lobby.LobbyMu.RLock()
			endRaceMessage := &types.WebSocketMessage{
				Type:    types.EndRace,
				LobbyID: lobbyID,
				Data: types.EndRaceData{
					Players: lobby.Players,
				},
			}
			lobby.LobbyMu.RUnlock()
			if err := lm.Broadcast(endRaceMessage); err != nil {
				fmt.Printf("Error broadcasting end race: %v\n", err)
			}

			go func() {
				err := lm.SaveRaceResults(lobbyID)
				if err != nil {
					fmt.Printf("Error saving race results: %v\n", err)
				}
			}()

			return
		}

		timeLeftMessage := &types.WebSocketMessage{
			Type:    types.TimeLeft,
			LobbyID: lobbyID,
			Data: types.TimeLeftData{
				TimeLeft: timeLeft,
			},
		}

		if err := lm.Broadcast(timeLeftMessage); err != nil {
			fmt.Printf("Error broadcasting time left: %v\n", err)
		}
	}
}

// HandleProgress handles progress
func (lm *LobbyManager) HandleProgress(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {

	if message.LobbyID == "" {
		return nil, fmt.Errorf("lobby ID is required")
	}

	lobbyID := message.LobbyID

	lm.globalMu.RLock()
	lobby, exists := lm.Lobbies[lobbyID]

	if !exists {
		lm.globalMu.RUnlock()
		return nil, fmt.Errorf("lobby does not exist")
	}
	lm.globalMu.RUnlock()

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

	playerID, ok := playerData["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required and should be a string")
	}

	lobby.LobbyMu.Lock()
	defer lobby.LobbyMu.Unlock()

	// find and update player data
	for i, player := range lobby.Players {
		if player.PlayerID == playerID {
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

	lm.Lobbies[message.LobbyID] = lobby

	broadcastMessage := &types.WebSocketMessage{
		LobbyID: lobbyID,
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
