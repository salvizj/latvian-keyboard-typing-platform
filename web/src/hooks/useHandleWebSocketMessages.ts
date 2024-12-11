import { useEffect, useRef, useState } from 'react';
import { useTyping } from '../context/TypingContext';
import { useOptions } from '../context/OptionsContext';
import { LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';
import constructWebSocketMessage from '../utils/constructWebsocktMessage';

type UseHandleWebSocketMessagesParams = {
    isSocketOpen: boolean;
    userIdOrEmpty: string;
    playerId: string | null;
    isOptionsSet: boolean;
    isTypingFinished: boolean;
    lobbyStatus: LobbyStatus;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
};
const useHandleWebSocketMessages = ({
    isSocketOpen,
    userIdOrEmpty,
    isOptionsSet,
    playerId,
    isTypingFinished,
    lobbyStatus,
    sendMessage,
}: UseHandleWebSocketMessagesParams) => {
    const { text, time, lobbyId, username, maxPlayerCount, lobbyMode, timeLeft } = useOptions();
    const previousProcentsRef = useRef<number | null>(null);
    const { wpm, mistakeCount, procentsOfTextTyped } = useTyping();

    const [hasSentCreateLobby, setHasSentCreateLobby] = useState(false);
    const [hasSentJoinLobby, setHasSentJoinLobby] = useState(false);

    useEffect(() => {
        if (!isSocketOpen || !isOptionsSet || timeLeft === undefined) return;

        const basePlayerData = {
            username,
            userId: userIdOrEmpty,
        };

        // handle join or create lobby
        if (lobbyMode === 'create' && time != null && !hasSentCreateLobby) {
            const createLobbyMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.CreateLobby,
                lobbySettings: { time, maxPlayerCount, text },
                players: [basePlayerData],
            });

            if (createLobbyMessage) {
                sendMessage(createLobbyMessage);
                setHasSentCreateLobby(true);
            }
        } else if (lobbyMode === 'join' && !hasSentJoinLobby) {
            const joinLobbyMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.JoinLobby,
                lobbyId,
                players: [basePlayerData],
            });
            if (joinLobbyMessage) {
                sendMessage(joinLobbyMessage);
                setHasSentJoinLobby(true);
            }
        }

        // handle game progress update
        if (
            lobbyStatus === LobbyStatus.InProgress &&
            playerId != null &&
            procentsOfTextTyped !== previousProcentsRef.current
        ) {
            previousProcentsRef.current = procentsOfTextTyped;
            const progressMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.Progress,
                lobbyId,
                players: [
                    {
                        playerId: playerId,
                        username,
                        userId: userIdOrEmpty,
                        wpm: wpm,
                        mistakeCount: mistakeCount,
                        procentsOfTextTyped: procentsOfTextTyped,
                    },
                ],
            });

            if (progressMessage) sendMessage(progressMessage);
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
        hasSentCreateLobby,
        hasSentJoinLobby,
        playerId,
        isTypingFinished,
    ]);
};
export default useHandleWebSocketMessages;
