import { useEffect } from 'react';
import { LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';

type UseLobbyStatusManagementParams = {
    messages: WebSocketMessage<WebSocketMessageData>[];
    setLobbyStatus: (lobbyStatus: LobbyStatus) => void;
};

const useLobbyStatusMenagement = ({ messages, setLobbyStatus }: UseLobbyStatusManagementParams) => {
    useEffect(() => {
        const startGameMessage = messages.find((msg) => msg.type === WebSocketMessageType.StartRace);
        const endGameMessage = messages.find((msg) => msg.type === WebSocketMessageType.EndRace);

        if (startGameMessage) {
            setLobbyStatus(LobbyStatus.InProgress);
        }
        if (endGameMessage) {
            setLobbyStatus(LobbyStatus.Finished);
        }
    }, [messages, setLobbyStatus]);
};
export default useLobbyStatusMenagement;
