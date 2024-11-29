import {
    LobbySettings,
    LobbyStatus,
    Player,
    WebSocketMessage,
    WebSocketMessageData,
    WebSocketMessageType,
} from '../types';

type ConstructWebSocketMessageParams = {
    messageType: WebSocketMessageType;
    text?: string;
    time?: number;
    maxPlayerCount?: number;
    username?: string;
    lobbyId?: string;
    players?: Player[];
    lobbyStatus?: LobbyStatus;
    lobbySettings?: LobbySettings;
};

const constructWebSocketMessage = ({
    messageType,
    lobbySettings,
    players,
    lobbyStatus,
    lobbyId = '',
}: ConstructWebSocketMessageParams): WebSocketMessage<WebSocketMessageData> | null => {
    const baseMessage: WebSocketMessage<WebSocketMessageData> = {
        type: messageType,
        lobbyId: lobbyId,
        data: {} as WebSocketMessageData,
    };

    switch (messageType) {
        case WebSocketMessageType.CreateLobby:
            if (!lobbySettings || !players) {
                throw new Error('lobbySettings and players are required for creating a lobby');
            }
            return {
                ...baseMessage,
                data: {
                    lobbySettings,
                    players,
                },
            };

        case WebSocketMessageType.JoinLobby:
            if (!lobbyId) {
                throw new Error('lobbyId is required to join');
            }
            if (!players) {
                throw new Error('players information is required to join');
            }
            return {
                ...baseMessage,
                data: {
                    players,
                },
            };

        case WebSocketMessageType.StartRace:
            if (!lobbyId) {
                throw new Error('lobbyId is required to start race');
            }
            return {
                ...baseMessage,
                data: {},
            };

        case WebSocketMessageType.Progress:
            if (!lobbyId) {
                throw new Error('lobbyId is required ');
            }
            if (!lobbyStatus) {
                throw new Error('lobby status required ');
            }
            return {
                ...baseMessage,
                data: { players },
            };
        default:
            throw new Error(`Unsupported WebSocketMessageType: ${messageType}`);
    }
};
export default constructWebSocketMessage;
