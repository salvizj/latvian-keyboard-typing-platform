package managers

import (
	"fmt"
	"latvian-typing-tutor/types"
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

	lobbyId := message.LobbyId
	if _, exists := lm.Lobbies[lobbyId]; exists {
		return nil, fmt.Errorf("lobby with ID %s already exists", lobbyId)
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

	playerId := uuid.New().String()

	userId, ok := data["userId"].(string)
	if !ok {
		userId = ""
	}

	owner := types.Player{
		PlayerId: playerId,
		UserId:   userId,
		Role:     types.PlayerRoleOwner,
		Place:    0,
		Mistakes: 0,
		Wpm:      0,
	}

	lobby := &types.Lobby{
		LobbyId: lobbyId,
		Players: []types.Player{owner},
		Status:  types.LobbyStatusWaiting,
		LobbySettings: types.LobbySettings{
			Text:           text,
			Time:           time,
			MaxPlayerCount: maxPlayerCount,
		},
	}

	lm.Lobbies[lobbyId] = lobby
	lm.Connections[lobbyId] = []*websocket.Conn{conn}

	return &types.WebSocketMessage{
		Type:    types.CreateLobby,
		LobbyId: lobbyId,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
			Status:        lobby.Status,
		},
	}, nil
}

func (lm *LobbyManager) HandleJoinLobby(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobbyId := message.LobbyId
	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby with ID %s does not exist", lobbyId)
	}

	if len(lobby.Players) >= lobby.LobbySettings.MaxPlayerCount {
		return nil, fmt.Errorf("lobby %s is full", lobbyId)
	}

	data, ok := message.Data.(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("invalid data format")
	}

	playerId := uuid.New().String()

	role := types.PlayerRoleOwner

	userId, ok := data["userId"].(string)
	if !ok {
		userId = ""
	}

	player := types.Player{
		PlayerId: playerId,
		UserId:   userId,
		Role:     role,
		Place:    0,
		Mistakes: 0,
		Wpm:      0,
	}

	lobby.Players = append(lobby.Players, player)
	lm.Connections[lobbyId] = append(lm.Connections[lobbyId], conn)

	return &types.WebSocketMessage{
		Type:    types.JoinLobby,
		LobbyId: lobbyId,
		Data: types.CreateLobbyData{
			LobbySettings: lobby.LobbySettings,
			Players:       lobby.Players,
			Status:        lobby.Status,
		},
	}, nil
}

func (lm *LobbyManager) HandleStartGame(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	lobby.Status = types.LobbyStatusInProgress

	return &types.WebSocketMessage{
		Type:    types.StartGame,
		LobbyId: lobbyId,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandleEndGame(message types.WebSocketMessage, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobbyId := message.LobbyId

	lobby, exists := lm.Lobbies[lobbyId]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	lobby.Status = types.LobbyStatusFinished

	return &types.WebSocketMessage{
		Type:    types.EndGame,
		LobbyId: lobbyId,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}
