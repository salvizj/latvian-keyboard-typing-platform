import { useEffect, useRef, useState } from 'react';
import { useTyping } from '../context/TypingContext';
import { useOptions } from '../context/OptionsContext';
import { LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';
import constructWebSocketMessage from '../utils/constructWebsocktMessage';

export type UseHandleWebSocketMessagesParams = {
    isSocketOpen: boolean;
    userIdOrEmpty: string;
    playerId: string | null;
    isOptionsSet: boolean;
    lobbyStatus: LobbyStatus;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
};

const useHandleWebSocketMessages = ({
    isSocketOpen,
    userIdOrEmpty,
    isOptionsSet,
    playerId,
    lobbyStatus,
    sendMessage,
}: UseHandleWebSocketMessagesParams) => {
    const { text, time, lobbyId, username, maxPlayerCount, lobbyMode, timeLeft, textId, customText, textType } =
        useOptions();
    const previousProcentsRef = useRef<number | null>(null);
    const { wpm, mistakeCount, percentageOfTextTyped } = useTyping();

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
                lobbySettings: { time, maxPlayerCount, text, textId, customText, textType },
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
            percentageOfTextTyped !== previousProcentsRef.current
        ) {
            previousProcentsRef.current = percentageOfTextTyped;
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
                        percentageOfTextTyped: percentageOfTextTyped,
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
        percentageOfTextTyped,
        timeLeft,
        lobbyStatus,
        userIdOrEmpty,
        sendMessage,
        hasSentCreateLobby,
        hasSentJoinLobby,
        playerId,
        customText,
        textType,
        textId,
    ]);
};
export default useHandleWebSocketMessages;
