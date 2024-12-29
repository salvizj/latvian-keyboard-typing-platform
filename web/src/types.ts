export enum Finger {
    Pinky = 'pinky',
    Ring = 'ring',
    Middle = 'middle',
    Index = 'index',
    Thumb = 'thumb',
}

export enum KeyboardLayouts {
    Qwerty = 'qwerty',
    Dvorak = 'dvorak',
}

export enum Hand {
    Left = 'left',
    Right = 'right',
    Both = 'both',
}

export type KeyObj = {
    key: string;
    label: string;
    width: string;
    hand?: Hand;
    finger?: Finger;
    altKey?: string;
    altLabel?: string;
};

export enum LessonDifficulty {
    Beginner = 'beginner',
    Intermediate = 'intermediate',
    Advanced = 'advanced',
    Expert = 'expert',
}

export type Lesson = {
    lessonId: number;
    lessonDifficulty: LessonDifficulty;
    lessonText: string;
};

export type LessonCompletion = {
    userId: string;
    lessonId: number[];
};

export type HandFingerInfoObj = {
    hand: Hand;
    finger: Finger;
    isShift: boolean;
    isAlt: boolean;
};

export type WritersText = {
    writersTextId: number;
    writersFirstName: string;
    writersLastName: string;
    fragmentName: string;
    fragmentsContent: string;
};

export type LatvianWord = {
    latvinWordId: number;
    latvianWord: string;
};

export type TestCompletionObj = {
    wpm: number;
    mistakeCount: number;
    text: string;
    time: number;
    completedDate: Date;
};

export type Lobby = {
    lobbyId: string;
    lobbySettings: LobbySettings;
    players: Player[];
    date?: string;
};

export type LobbySettings = {
    lobbySettingsId?: null | number;
    textType: 'writers' | 'custom';
    textId: number | null;
    writersText?: WritersText | null;
    customText: string | null;
    text: string;
    maxPlayerCount: number;
    time: number;
};

export type Player = {
    playerId?: string;
    lobbyid?: string;
    username: string;
    userId?: string | null;
    role?: PlayerRole;
    place?: number;
    mistakeCount?: number;
    wpm?: number;
    percentageOfTextTyped?: number;
    finishedTyping?: boolean;
};

export enum PlayerRole {
    Player = 'player',
    Leader = 'leader',
}

export enum LobbyStatus {
    Waiting = 'waiting',
    InProgress = 'inProgress',
    Finished = 'finished',
}

export type WebSocketMessage<WebSocketMessageData> = {
    type: WebSocketMessageType;
    lobbyId: string;
    data: WebSocketMessageData;
};

export type WebSocketMessageData =
    | CreateLobbyData
    | JoinLobbyData
    | StartRaceData
    | EndRaceData
    | TimeLeftData
    | ErrorData
    | ProgressData;

export type CreateLobbyData = {
    lobbySettings: LobbySettings;
    players: Player[];
};

export type JoinLobbyData = {
    lobbySettings: LobbySettings;
    players: Player[];
};

export type ProgressData = {
    players: Player[];
};

export type StartRaceData = object;

export type EndRaceData = {
    players: Player[];
};
export type TimeLeftData = {
    timeLeft: number;
};

export type ErrorData = {
    message: string;
};

export enum WebSocketMessageType {
    CreateLobby = 'createLobby',
    JoinLobby = 'joinLobby',
    Progress = 'progress',
    StartRace = 'startRace',
    EndRace = 'endRace',
    TimeLeft = 'timeLeft',
    FinishedTyping = 'finishedTyping',
    Error = 'error',
}

export type ValidationErrors = {
    customText?: string;
    lobbyId?: string;
    username?: string;
    selectedText?: string;
    time?: string;
    maxPlayerCount?: string;
};

export enum HistoryTypes {
    TypingRace = 'typingRace',
    TypingTest = 'typingTest',
}

export type TypingTest = {
    typingTestId?: number;
    userId: string;
    typingTestSettingsId: number | null;
    wpm: number;
    mistakeCount: number;
    date: string;
};

export type TypingTestWithSettings = {
    typingTestId?: number;
    userId: string;
    typingTestSettings: TypingTestSettings;
    wpm: number;
    mistakeCount: number;
    date: string;
};

export type TypingTestSettings = {
    typingTestSettingsId: null | number;
    textType: 'writers' | 'custom';
    textId: number | null;
    writersText?: WritersText | null;
    customText: string | null;
    time: number;
};

export type TypingTestOrRaceData =
    | { type: HistoryTypes.TypingTest; tests: TypingTestWithSettings[] }
    | {
          type: HistoryTypes.TypingRace;
          races: Lobby[];
      };

export enum GameOption {
    HideWords = 'hide_words',
    TypeLetters = 'type_letters',
}
export type GameLogic = {
    currentWord?: string;
    currentLetter?: string;
    handleKeyPress: (key: string) => void;
    completionTitle: string;
    round: number;
    isGameOver: boolean;
    showWord?: boolean;
    record?: number;
    mode: GameOption;
};
