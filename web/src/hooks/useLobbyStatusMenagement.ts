import { useEffect } from 'react';
import { LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';

type UseLobbyStatusManagementParams = {
    messages: WebSocketMessage<WebSocketMessageData>[];
    setLobbyStatus: (lobbyStatus: LobbyStatus) => void;
};

const useLobbyStatusMenagement = ({ messages, setLobbyStatus }: UseLobbyStatusManagementParams) => {
    useEffect(() => {
        const timeLeftMessage = messages.find((msg) => msg.type === WebSocketMessageType.TimeLeft);
        const raceEndedtMessage = messages.find((msg) => msg.type === WebSocketMessageType.EndRace);
        if (timeLeftMessage) {
            setLobbyStatus(LobbyStatus.InProgress);
        }
        if (raceEndedtMessage) {
            setLobbyStatus(LobbyStatus.Finished);
        }
    }, [messages, setLobbyStatus]);
};
export default useLobbyStatusMenagement;
