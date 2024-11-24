import { useState, useEffect, useCallback } from 'react';
import {
    WebSocketMessage,
    WebSocketMessageData,
    CreateLobbyData,
    WebSocketMessageType,
    LobbyStatus,
    JoinLobbyData,
} from '../types';

type UseWebSocketManagementParams = {
    url: string | null;
    text: string;
    time: number;
    userId: string;
    maxPlayerCount: number;
    lobbyId: string;
    username: string;
    lobbyMode: 'create' | 'join';
};
export const useWebSocketMenagement = ({
    url,
    text,
    time,
    userId,
    maxPlayerCount,
    lobbyId,
    lobbyMode,
    username,
}: UseWebSocketManagementParams) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage<WebSocketMessageData>[]>([]);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage<WebSocketMessageData> | null>(null);

    useEffect(() => {
        if (url && !socket) {
            const ws = new WebSocket(url);

            ws.onopen = () => {
                console.log('WebSocket connected');
                if (lobbyMode === 'create') {
                    const initialMessage: WebSocketMessage<CreateLobbyData> = {
                        type: WebSocketMessageType.CreateLobby,
                        lobbyId: '',
                        status: LobbyStatus.Waiting,
                        data: {
                            lobbySettings: {
                                text,
                                time,
                                maxPlayerCount,
                            },
                            players: [
                                {
                                    username: username,
                                    playerId: '',
                                    userId: userId || '',
                                },
                            ],
                        },
                    };

                    ws.send(JSON.stringify(initialMessage));
                } else if (lobbyMode === 'join') {
                    const initialMessage: WebSocketMessage<JoinLobbyData> = {
                        type: WebSocketMessageType.JoinLobby,
                        lobbyId: lobbyId,
                        data: {
                            players: [
                                {
                                    username: username,
                                    playerId: '',
                                    userId: userId || '',
                                },
                            ],
                        },
                    };

                    ws.send(JSON.stringify(initialMessage));
                }
            };

            ws.onmessage = (event) => {
                const parsedMessage: WebSocketMessage<WebSocketMessageData> = JSON.parse(event.data);
                setLastMessage(parsedMessage);

                // only append to messages if it's not the same message
                if (parsedMessage !== lastMessage) {
                    setMessages((prevMessages) => [...prevMessages, parsedMessage]);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket closed');
            };

            setSocket(ws);

            // cleanup WebSocket connection on component unmount
            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            };
        }
    }, [lastMessage, lobbyId, lobbyMode, maxPlayerCount, socket, text, time, url, userId, username]);

    const sendMessage = useCallback(
        (message: WebSocketMessage<WebSocketMessageData>) => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            }
        },
        [socket]
    );

    return {
        messages,
        lastMessage,
        sendMessage,
    };
};
