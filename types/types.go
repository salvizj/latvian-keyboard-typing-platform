package types

type Lesson struct {
	Id         int    `json:"id"`
	LessonType string `json:"lessonType"`
	LessonText string `json:"lessonText"`
}
type PoetText struct {
	Id               int    `json:"id"`
	PoetAuthor       string `json:"poetAuthor"`
	PoetFragmentName string `json:"poetFragment"`
	PoetTextContent  string `json:"poetText"`
}

type Lobby struct {
	LobbyID       string        `json:"lobbyId"`
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
	Status        LobbyStatus   `json:"status"`
}

type LobbySettings struct {
	Text           string `json:"text"`
	Time           int    `json:"time"`
	MaxPlayerCount int    `json:"maxPlayerCount"`
}

type Player struct {
	PlayerID string     `json:"playerId"`
	UserId   string     `json:"userId,omitempty"`
	Role     PlayerRole `json:"role"`
	Place    int        `json:"place"`
	Mistakes int        `json:"mistakes"`
	Wpm      int        `json:"wpm"`
}

type PlayerRole string

const (
	PlayerRoleDefault PlayerRole = "default"
	PlayerRoleOwner   PlayerRole = "owner"
)

type LobbyStatus string

const (
	LobbyStatusWaiting    LobbyStatus = "waiting"
	LobbyStatusInProgress LobbyStatus = "in-progress"
	LobbyStatusFinished   LobbyStatus = "finished"
)

type WebSocketMessage struct {
	Type    WebSocketMessageTypes  `json:"type"`
	LobbyID string                 `json:"lobbyId"`
	Data    map[string]interface{} `json:"data,omitempty"`
}

type WebSocketMessageTypes string

const (
	CreateLobby         WebSocketMessageTypes = "createLobby"
	JoinLobby           WebSocketMessageTypes = "joinLobby"
	UpdateLobbySettings WebSocketMessageTypes = "updateLobbySettings"
	PlayerUpdate        WebSocketMessageTypes = "playerUpdate"
	StartGame           WebSocketMessageTypes = "startGame"
	EndGame             WebSocketMessageTypes = "endGame"
	Error               WebSocketMessageTypes = "error"
)
