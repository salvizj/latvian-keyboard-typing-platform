package managers

import (
	"fmt"
	"latvian-typing-tutor/types"
	"sync"

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

func (lm *LobbyManager) HandleCreateLobby(lobbyID string, data map[string]interface{}, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	if _, exists := lm.Lobbies[lobbyID]; exists {
		return nil, fmt.Errorf("lobby with ID %s already exists", lobbyID)
	}

	playerID, ok := data["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required")
	}

	userID, ok := data["userId"].(string)
	if !ok {
		return nil, fmt.Errorf("userId is required")
	}

	lobbySettingsRaw, ok := data["lobbySettings"].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("lobbySettings is required and should be an object")
	}
	text, ok := lobbySettingsRaw["text"].(string)
	if !ok {
		return nil, fmt.Errorf("text is required and should be a string")
	}
	time, ok := lobbySettingsRaw["time"].(int)
	if !ok {
		return nil, fmt.Errorf("time is required and should be a string")
	}
	maxPlayerCount, ok := lobbySettingsRaw["maxPlayerCount"].(int)
	if !ok {
		return nil, fmt.Errorf("maxPlayerCount is required and should be a string")
	}
	owner := types.Player{
		PlayerID: playerID,
		UserId:   userID,
		Role:     types.PlayerRoleOwner,
		Place:    0,
		Mistakes: 0,
		Wpm:      0,
	}

	lobby := &types.Lobby{
		LobbyID: lobbyID,
		Players: []types.Player{owner},
		Status:  types.LobbyStatusWaiting,
		LobbySettings: types.LobbySettings{
			Text:           text,
			Time:           time,
			MaxPlayerCount: maxPlayerCount,
		},
	}

	lm.Lobbies[lobbyID] = lobby
	lm.Connections[lobbyID] = []*websocket.Conn{conn}

	return &types.WebSocketMessage{
		Type:    types.CreateLobby,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandleJoinLobby(lobbyID string, data map[string]interface{}, conn *websocket.Conn) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobby, exists := lm.Lobbies[lobbyID]
	if !exists {
		return nil, fmt.Errorf("lobby with ID %s does not exist", lobbyID)
	}

	if len(lobby.Players) >= lobby.LobbySettings.MaxPlayerCount {
		return nil, fmt.Errorf("lobby %s is full", lobbyID)
	}

	playerID, ok := data["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required")
	}

	userID, ok := data["userId"].(string)
	if !ok {
		return nil, fmt.Errorf("userId is required")
	}

	player := types.Player{
		PlayerID: playerID,
		UserId:   userID,
		Role:     types.PlayerRoleDefault,
		Place:    0,
		Mistakes: 0,
		Wpm:      0,
	}

	lobby.Players = append(lobby.Players, player)
	lm.Connections[lobbyID] = append(lm.Connections[lobbyID], conn)

	return &types.WebSocketMessage{
		Type:    types.JoinLobby,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandleUpdateSettings(lobbyID string, data map[string]interface{}) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobby, exists := lm.Lobbies[lobbyID]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	if text, ok := data["text"].(string); ok {
		lobby.LobbySettings.Text = text
	}
	if time, ok := data["time"].(float64); ok {
		lobby.LobbySettings.Time = int(time)
	}
	if maxPeople, ok := data["maxPeopleCount"].(float64); ok {
		lobby.LobbySettings.MaxPlayerCount = int(maxPeople)
	}

	return &types.WebSocketMessage{
		Type:    types.UpdateLobbySettings,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandlePlayerUpdate(lobbyID string, data map[string]interface{}) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobby, exists := lm.Lobbies[lobbyID]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	playerID, ok := data["playerId"].(string)
	if !ok {
		return nil, fmt.Errorf("playerId is required")
	}

	for i, player := range lobby.Players {
		if player.PlayerID == playerID {
			if wpm, ok := data["wpm"].(float64); ok {
				lobby.Players[i].Wpm = int(wpm)
			}
			if mistakes, ok := data["mistakes"].(float64); ok {
				lobby.Players[i].Mistakes = int(mistakes)
			}
			if place, ok := data["place"].(float64); ok {
				lobby.Players[i].Place = int(place)
			}
			break
		}
	}

	return &types.WebSocketMessage{
		Type:    types.PlayerUpdate,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandleStartGame(lobbyID string, data map[string]interface{}) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobby, exists := lm.Lobbies[lobbyID]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	lobby.Status = types.LobbyStatusInProgress

	return &types.WebSocketMessage{
		Type:    types.StartGame,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}

func (lm *LobbyManager) HandleEndGame(lobbyID string, data map[string]interface{}) (*types.WebSocketMessage, error) {
	lm.mu.Lock()
	defer lm.mu.Unlock()

	lobby, exists := lm.Lobbies[lobbyID]
	if !exists {
		return nil, fmt.Errorf("lobby does not exist")
	}

	lobby.Status = types.LobbyStatusFinished

	return &types.WebSocketMessage{
		Type:    types.EndGame,
		LobbyID: lobbyID,
		Data: map[string]interface{}{
			"lobby": lobby,
		},
	}, nil
}
