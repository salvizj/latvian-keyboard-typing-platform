export enum Finger {
    Pinky = 'pinky',
    Ring = 'ring',
    Middle = 'middle',
    Index = 'index',
    Thumb = 'thumb',
}

export enum Hand {
    Left = 'left',
    Right = 'right',
}
export type KeyObj = {
    key: string;
    label: string;
    size: string;
    hand?: Hand;
    finger?: Finger;
    altKey?: string;
    altLabel?: string;
};

export type Lesson = {
    id: number;
    lessonType: string;
    lessonText: string;
};
export type HandFingerInfo = {
    hand: Hand;
    finger: Finger;
    isShift: boolean;
    isAlt: boolean;
};
export type LessonCompletionObj = {
    lessonId: number;
    completed: boolean;
    completedDate: Date;
};

export type LessonCompletionData = Record<string, LessonCompletionObj>;

export type PoetText = {
    id: number;
    poetAuthor: string;
    poetFragmentName: string;
    poetText: string;
};
export type TestCompletionObj = {
    wpm: number;
    mistakeCount: number;
    text: string;
    time: number;
    completedDate: Date;
};

export type TestCompletionData = Record<string, TestCompletionObj>;

export type Lobby = {
    lobbyId: string;
    lobbySettings: LobbySettings;
    players: Player[];
    status: LobbyStatus;
};

export type LobbySettings = {
    text: string;
    time: number;
    maxPlayerCount: number;
};

export type Player = {
    playerId: string;
    userId?: string | null;
    role: PlayerRole;
    place: number;
    mistakes: number;
    wpm: number;
};

export enum PlayerRole {
    Default = 'default',
    Owner = 'owner',
}

export enum LobbyStatus {
    Waiting = 'waiting',
    InProgress = 'in-progress',
    Finished = 'finished',
}

export type WebSocketMessage = {
    type: WebSocketMessageType;
    lobbyId: string;
    data?: unknown;
};

export enum WebSocketMessageType {
    CreateLobby = 'createLobby',
    JoinLobby = 'joinLobby',
    UpdateLobbySettings = 'updateLobbySettings',
    PlayerUpdate = 'playerUpdate',
    StartGame = 'startGame',
    EndGame = 'endGame',
    Error = 'error',
}
