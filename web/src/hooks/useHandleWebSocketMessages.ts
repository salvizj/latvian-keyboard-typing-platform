import { useEffect } from 'react';
import { useTyping } from '../context/TypingContext';
import { useOptions } from '../context/OptionsContext';
import { LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';
import constructWebSocketMessage from '../utils/constructWebsocktMessage';

type UseHandleWebSocketMessagesParams = {
    isSocketOpen: boolean;
    userIdOrEmpty: string;
    isOptionsSet: boolean;
    lobbyStatus: LobbyStatus;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
};
export const useHandleWebSocketMessages = ({
    isSocketOpen,
    userIdOrEmpty,
    isOptionsSet,
    lobbyStatus,
    sendMessage,
}: UseHandleWebSocketMessagesParams) => {
    const PROGRESS_UPDATE_INTERVAL = 2000;
    const { text, time, lobbyId, username, maxPlayerCount, lobbyMode, timeLeft } = useOptions();
    const { wpm, mistakeCount, procentsOfTextTyped } = useTyping();

    useEffect(() => {
        // handle lobby creation and joining when the WebSocket is open and options are set
        if (!isSocketOpen || !isOptionsSet || timeLeft === undefined) return;

        const basePlayerData = {
            username,
            playerId: '',
            userId: userIdOrEmpty,
        };

        // Create or join lobby
        if (lobbyMode === 'create' && time != null) {
            const createLobbyMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.CreateLobby,
                lobbySettings: { time, maxPlayerCount, text },
                players: [basePlayerData],
            });
            if (createLobbyMessage) sendMessage(createLobbyMessage);
        } else if (lobbyMode === 'join') {
            const joinLobbyMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.JoinLobby,
                lobbyId,
                players: [basePlayerData],
            });
            if (joinLobbyMessage) sendMessage(joinLobbyMessage);
        }

        // handle game progress update
        if (lobbyStatus === LobbyStatus.InProgress) {
            const interval = setInterval(() => {
                if (time === timeLeft) return;

                const progressMessage = constructWebSocketMessage({
                    messageType: WebSocketMessageType.Progress,
                    lobbyId,
                    players: [
                        {
                            username,
                            playerId: '',
                            userId: userIdOrEmpty,
                            wpm: wpm,
                            mistakeCount: mistakeCount,
                            procentsOfTextTyped: procentsOfTextTyped,
                        },
                    ],
                });

                if (progressMessage) sendMessage(progressMessage);
            }, PROGRESS_UPDATE_INTERVAL);

            return () => clearInterval(interval);
        }

        // handle race end
        if ((lobbyStatus as LobbyStatus) === LobbyStatus.InProgress) {
            if (timeLeft === 0) {
                const endRaceMessage = constructWebSocketMessage({
                    messageType: WebSocketMessageType.EndRace,
                    lobbyId,
                });
                if (endRaceMessage) sendMessage(endRaceMessage);
            }
        }
    }, [
        isSocketOpen,
        isOptionsSet,
        lobbyMode,
        time,
        maxPlayerCount,
        text,
        username,
        lobbyId,
        wpm,
        mistakeCount,
        procentsOfTextTyped,
        timeLeft,
        lobbyStatus,
        userIdOrEmpty,
        sendMessage,
    ]);
};
