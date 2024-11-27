package managers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/types"
	"log"
	"sync"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type LobbyManager struct {
	mu          sync.RWMutex
	Lobbies     map[string]*types.Lobby
	Connections map[string][]*websocket.Conn
}

func NewLobbyManager() *LobbyManager {
	return &LobbyManager{
		Lobbies:     make(map[string]*types.Lobby),
		Connections: make(map[string][]*websocket.Conn),
	}
}
func (lm *LobbyManager) HandleCreateLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()
	log.Printf("Received create lobby request: %+v", message)
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
		Username:     username,
		PlayerId:     uuid.New().String(),
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

	return &types.WebSocketMessage{
		Type:        types.CreateLobby,
		LobbyId:     lobby.LobbyId,
		LobbyStatus: lobby.LobbyStatus,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
		},
	}, nil
}

func (lm *LobbyManager) HandleJoinLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	log.Printf("Received join lobby request: %+v", message)

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

	player := types.Player{
		Username:     username,
		PlayerId:     uuid.New().String(),
		UserId:       userId,
		Role:         types.PlayerRolePlayer,
		Place:        0,
		MistakeCount: 0,
		Wpm:          0,
	}

	lobby.Players = append(lobby.Players, player)

	if lm.Connections[lobbyId] == nil {
		lm.Connections[lobbyId] = make([]*websocket.Conn, 0)
	}

	lm.Connections[lobbyId] = append(lm.Connections[lobbyId], conn)

	lm.Lobbies[message.LobbyId] = lobby

	return &types.WebSocketMessage{
		Type:        types.JoinLobby,
		LobbyId:     lobbyId,
		LobbyStatus: lobby.LobbyStatus,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
		},
	}, nil
}

func (lm *LobbyManager) HandleStartRace(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
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

	if len(lobby.Players) > lobby.LobbySettings.MaxPlayerCount {
		return nil, fmt.Errorf("lobby %s is full", lobbyId)
	}

	lm.Lobbies[message.LobbyId] = lobby

	return &types.WebSocketMessage{
		Type:        types.StartRace,
		LobbyId:     lobbyId,
		LobbyStatus: types.LobbyStatusInProgress,
	}, nil
}

func (lm *LobbyManager) HandleEndRace(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
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

	lobby.LobbyStatus = types.LobbyStatusFinished

	lm.Lobbies[message.LobbyId] = lobby

	return &types.WebSocketMessage{
		Type:        types.EndRace,
		LobbyId:     lobbyId,
		LobbyStatus: lobby.LobbyStatus,
	}, nil
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

	playerId, ok := playerData["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required and should be a string")
	}

	wpmFloat, ok := playerData["wpm"].(float64)
	if !ok {
		return nil, fmt.Errorf("wpm is required and should be a number")
	}
	wpm := int(wpmFloat)

	mistakeCountFloat, ok := playerData["mistakeCount"].(float64)
	if !ok {
		return nil, fmt.Errorf("mistakes is required and should be a number")
	}
	mistakeCount := int(mistakeCountFloat)

	procentsOfTextTypedFloat, ok := playerData["procentsOfTextTyped"].(float64)
	if !ok {
		return nil, fmt.Errorf("procentsOfTextTyped is required and should be a number")
	}
	procentsOfTextTyped := int(procentsOfTextTypedFloat)

	// find and update player data
	for i, player := range lobby.Players {
		if player.PlayerId == playerId {
			// update player data
			lobby.Players[i].Wpm = wpm
			lobby.Players[i].MistakeCount = mistakeCount
			lobby.Players[i].ProcentsOfTextTyped = procentsOfTextTyped
			break
		}
	}

	lm.Lobbies[message.LobbyId] = lobby

	return &types.WebSocketMessage{
		LobbyId:     lobbyId,
		LobbyStatus: lobby.LobbyStatus,
		Data: types.ProgressData{
			Players: lobby.Players,
		},
	}, nil
}
