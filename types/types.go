package types

type Lesson struct {
	LessonId         int              `json:"lessonId"`
	LessonDifficulty LessonDifficulty `json:"lessonDifficulty"`
	LessonText       string           `json:"lessonText"`
}

type LessonDifficulty string

const (
	Beginner     LessonDifficulty = "beginner"
	Intermediate LessonDifficulty = "intermediate"
	Advanced     LessonDifficulty = "advanced"
	Expert       LessonDifficulty = "expert"
)

type PoetText struct {
	PoetTextId       int    `json:"poetTextId"`
	PoetAuthor       string `json:"poetAuthor"`
	PoetFragmentName string `json:"poetFragment"`
	PoetTextContent  string `json:"poetText"`
}

type LatvianWord struct {
	LatvianWordId int    `json:"latvianWordId"`
	LatvianWord   string `json:"latvianWord"`
}

type Lobby struct {
	LobbyId         string        `json:"lobbyId"`
	LobbySettings   LobbySettings `json:"lobbySettings"`
	LobbySettingsId int           `json:"lobbySettingsId,omitempty"`
	Players         []Player      `json:"players"`
	LobbyStatus     LobbyStatus   `json:"lobbyStatus,omitempty"`
	Date            string        `json:"date,omitempty"`
}

type LobbySettings struct {
	LobbySettingsId int    `json:"lobbySettingsId,omitempty"`
	TextType        string `json:"textType,omitempty"`
	TextId          int    `json:"textId,omitempty"`
	CustomText      string `json:"customText,omitempty"`
	Text            string `json:"text"`
	MaxPlayerCount  int    `json:"maxPlayerCount"`
	Time            int    `json:"time"`
}

type Player struct {
	PlayerId              string     `json:"playerId,omitempty"`
	LobbyId               string     `json:"lobbyId,omitempty"`
	Username              string     `json:"username"`
	UserId                string     `json:"userId,omitempty"`
	Role                  PlayerRole `json:"role,omitempty"`
	Place                 int        `json:"place,omitempty"`
	MistakeCount          int        `json:"mistakeCount,omitempty"`
	Wpm                   int        `json:"wpm,omitempty"`
	PercentageOfTextTyped int        `json:"percentageOfTextTyped,omitempty"`
	FinishedTyping        bool       `json:"finishedTyping,omitempty"`
	LobbySettingsid       int        `json:"lobbySettingsId,omitempty"`
}

type PlayerRole string

const (
	PlayerRolePlayer PlayerRole = "player"
	PlayerRoleLeader PlayerRole = "leader"
)

type LobbyStatus string

const (
	LobbyStatusWaiting    LobbyStatus = "waiting"
	LobbyStatusInProgress LobbyStatus = "inProgress"
	LobbyStatusFinished   LobbyStatus = "finished"
)

type WebSocketMessageTypes string

const (
	CreateLobby WebSocketMessageTypes = "createLobby"
	JoinLobby   WebSocketMessageTypes = "joinLobby"
	Progess     WebSocketMessageTypes = "progress"
	StartRace   WebSocketMessageTypes = "startRace"
	TimeLeft    WebSocketMessageTypes = "timeLeft"
	EndRace     WebSocketMessageTypes = "endRace"
	Error       WebSocketMessageTypes = "error"
)

type WebSocketMessage struct {
	Type    WebSocketMessageTypes `json:"type"`
	LobbyId string                `json:"lobbyId"`
	Data    interface{}           `json:"data"`
}

type CreateLobbyData struct {
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
}

type JoinLobbyData struct {
	LobbySettings LobbySettings `json:"lobbySettings"`
	Players       []Player      `json:"players"`
}

type TimeLeftData struct {
	TimeLeft int `json:"timeLeft"`
}

type StartRaceData struct {
}

type EndRaceData struct {
	Players []Player `json:"players"`
}

type ProgressData struct {
	Players []Player `json:"players"`
}

type ErrorData struct {
	Message string `json:"message"`
}

type TypingTestSettings struct {
	TypingTestSettingsId int    `json:"typingTestSettingsId,omitempty"`
	TextType             string `json:"textType"`
	TextId               int    `json:"textId,omitempty"`
	CustomText           string `json:"customText,omitempty"`
	Time                 int    `json:"time"`
}

type TypingTest struct {
	TypingTestId         int    `json:"typingTestId"`
	UserId               string `json:"userId"`
	TypingTestSettingsId int    `json:"typingTestSettingsId"`
	Wpm                  int    `json:"wpm"`
	MistakeCount         int    `json:"mistakeCount"`
	Date                 string `json:"date"`
}

type HistoryType string

const (
	TypingRaceType HistoryType = "typingRace"
	TypingTestType HistoryType = "typingTest"
)
