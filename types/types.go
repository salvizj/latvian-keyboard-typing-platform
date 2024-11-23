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
	LobbyId       string        `json:"lobbyId"`
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
	PlayerId string     `json:"playerId"`
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

type WebSocketMessageTypes string

const (
	CreateLobby WebSocketMessageTypes = "createLobby"
	JoinLobby   WebSocketMessageTypes = "joinLobby"
	StartGame   WebSocketMessageTypes = "startGame"
	EndGame     WebSocketMessageTypes = "endGame"
	Error       WebSocketMessageTypes = "error"
)

type WebSocketMessage struct {
	Type    WebSocketMessageTypes `json:"type"`
	LobbyId string                `json:"lobbyId"`
	Data    interface{}           `json:"data,omitempty"`
}

type CreateLobbyData struct {
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
	Status        LobbyStatus   `json:"status"`
}

type JoinLobbyData struct {
	Players []Player `json:"players"`
}

type StartGameData struct {
	StartGame bool `json:"startGame"`
}

type EndGameData struct {
	EndGame bool `json:"endGame"`
}

type ErrorData struct {
	Message string `json:"message"`
}
