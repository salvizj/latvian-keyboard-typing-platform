package types

import "sync"

// Lesson represents a typing lesson with difficulty level and text.
type Lesson struct {
	LessonID         int              `json:"lessonId"`
	LessonDifficulty LessonDifficulty `json:"lessonDifficulty"`
	LessonText       string           `json:"lessonText"`
}

// LessonDifficulty represents the difficulty level of a lesson.
type LessonDifficulty string

// Constants representing different difficulty levels of a lesson.
const (
	Beginner     LessonDifficulty = "beginner"
	Intermediate LessonDifficulty = "intermediate"
	Advanced     LessonDifficulty = "advanced"
	Expert       LessonDifficulty = "expert"
)

// PoetText represents a fragment of a poem with an author and content.
type PoetText struct {
	PoetTextID       int    `json:"poetTextId"`
	PoetAuthor       string `json:"poetAuthor"`
	PoetFragmentName string `json:"poetFragmentName"`
	PoetTextContent  string `json:"poetText"`
}

// LatvianWord represents a word in the Latvian language with its ID.
type LatvianWord struct {
	LatvianWordID int    `json:"latvianWordId"`
	LatvianWord   string `json:"latvianWord"`
}

// LobbyWithLock represents a lobby with a read-write lock for concurrency control.
type LobbyWithLock struct {
	LobbyMu         sync.RWMutex
	LobbyID         string        `json:"lobbyId"`
	LobbySettings   LobbySettings `json:"lobbySettings"`
	LobbySettingsID int           `json:"lobbySettingsId,omitempty"`
	Players         []Player      `json:"players"`
	LobbyStatus     LobbyStatus   `json:"lobbyStatus,omitempty"`
	Date            string        `json:"date,omitempty"`
}

// Lobby represents a typing race lobby with its settings and players.
type Lobby struct {
	LobbyID         string        `json:"lobbyId"`
	LobbySettings   LobbySettings `json:"lobbySettings"`
	LobbySettingsID int           `json:"lobbySettingsId,omitempty"`
	Players         []Player      `json:"players"`
	LobbyStatus     LobbyStatus   `json:"lobbyStatus,omitempty"`
	Date            string        `json:"date,omitempty"`
}

// LobbySettings represents the configuration of a lobby, including text type and player count.
type LobbySettings struct {
	LobbySettingsID int       `json:"lobbySettingsId,omitempty"`
	TextType        string    `json:"textType"`
	TextID          *int      `json:"textId,omitempty"`
	PoetText        *PoetText `json:"poetText,omitempty"`
	CustomText      *string   `json:"customText,omitempty"`
	Text            string    `json:"text"`
	MaxPlayerCount  int       `json:"maxPlayerCount"`
	Time            int       `json:"time"`
}

// Player represents a player in the game with their score and typing progress.
type Player struct {
	PlayerID              string     `json:"playerId,omitempty"`
	LobbyID               string     `json:"lobbyId,omitempty"`
	Username              string     `json:"username"`
	UserID                *string    `json:"userId,omitempty"`
	Role                  PlayerRole `json:"role,omitempty"`
	Place                 int        `json:"place,omitempty"`
	MistakeCount          int        `json:"mistakeCount,omitempty"`
	Wpm                   int        `json:"wpm,omitempty"`
	PercentageOfTextTyped int        `json:"percentageOfTextTyped,omitempty"`
	FinishedTyping        bool       `json:"finishedTyping,omitempty"`
}

// PlayerRole represents the role of a player in a lobby (either player or leader).
type PlayerRole string

// Constants representing player roles in a lobby.
const (
	PlayerRolePlayer PlayerRole = "player"
	PlayerRoleLeader PlayerRole = "leader"
)

// LobbyStatus represents the status of a lobby.
type LobbyStatus string

// Constants representing different states of a lobby.
const (
	LobbyStatusWaiting    LobbyStatus = "waiting"
	LobbyStatusInProgress LobbyStatus = "inProgress"
	LobbyStatusFinished   LobbyStatus = "finished"
)

// WebSocketMessageTypes represents the type of message sent over a WebSocket connection.
type WebSocketMessageTypes string

// Constants representing different WebSocket message types for events like creating or joining a lobby.
const (
	CreateLobby WebSocketMessageTypes = "createLobby"
	JoinLobby   WebSocketMessageTypes = "joinLobby"
	Progess     WebSocketMessageTypes = "progress"
	StartRace   WebSocketMessageTypes = "startRace"
	TimeLeft    WebSocketMessageTypes = "timeLeft"
	EndRace     WebSocketMessageTypes = "endRace"
	Error       WebSocketMessageTypes = "error"
)

// WebSocketMessage represents a message sent over WebSocket, including its type, lobby ID, and associated data.
type WebSocketMessage struct {
	Type    WebSocketMessageTypes `json:"type"`
	LobbyID string                `json:"lobbyId"`
	Data    interface{}           `json:"data"`
}

// CreateLobbyData represents the data needed to create a new lobby, including settings and players.
type CreateLobbyData struct {
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
}

// JoinLobbyData represents the data needed for a player to join a lobby.
type JoinLobbyData struct {
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
}

// TimeLeftData represents the time remaining in a race or test.
type TimeLeftData struct {
	TimeLeft int `json:"timeLeft"`
}

// StartRaceData represents data related to starting a race.
type StartRaceData struct {
}

// EndRaceData represents the data related to ending a race, including player information.
type EndRaceData struct {
	Players []Player `json:"players"`
}

// ProgressData represents the progress of players in a race or test.
type ProgressData struct {
	Players []Player `json:"players"`
}

// ErrorData represents an error message.
type ErrorData struct {
	Message string `json:"message"`
}

// TypingTestSettings represents the settings for a typing test, including the text type and duration.
type TypingTestSettings struct {
	TypingTestSettingsID int       `json:"typingTestSettingsId,omitempty"`
	TextType             string    `json:"textType"`
	TextID               *int      `json:"textId,omitempty"`
	PoetText             *PoetText `json:"poetText,omitempty"`
	CustomText           *string   `json:"customText,omitempty"`
	Time                 int       `json:"time"`
}

// TypingTest represents a completed typing test with user details and performance metrics.
type TypingTest struct {
	TypingTestID         int    `json:"typingTestId"`
	UserID               string `json:"userId"`
	TypingTestSettingsID int    `json:"typingTestSettingsId"`
	Wpm                  int    `json:"wpm"`
	MistakeCount         int    `json:"mistakeCount"`
	Date                 string `json:"date"`
}

// TypingTestWithSettings represents a typing test with its settings, including performance metrics.
type TypingTestWithSettings struct {
	TypingTestID       string             `json:"typingTestId"`
	UserID             string             `json:"userId"`
	Wpm                int                `json:"wpm"`
	MistakeCount       int                `json:"mistakeCount"`
	Date               string             `json:"date"`
	TypingTestSettings TypingTestSettings `json:"typingTestSettings"`
}

// HistoryType represents the type of history (typing race or typing test).
type HistoryType string

// Constants representing the two types of history (typing race or typing test).
const (
	TypingRaceType HistoryType = "typingRace"
	TypingTestType HistoryType = "typingTest"
)
