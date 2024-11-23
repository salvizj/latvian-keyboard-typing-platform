import { useState, useEffect, useCallback } from 'react';
import {
    CreateLobbyData,
    JoinLobbyData,
    LobbyStatus,
    WebSocketMessage,
    WebSocketMessageData,
    WebSocketMessageType,
} from '../types';

type UseWebSocketManagementParams = {
    url: string | null;
    text: string;
    time: number;
    maxPlayerCount: number;
    lobbyId: string | null;
    lobbyMode: 'create' | 'join';
};

export const useWebSocketMenagement = ({
    url,
    text,
    time,
    maxPlayerCount,
    lobbyId,
    lobbyMode,
}: UseWebSocketManagementParams) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage<WebSocketMessageData>[]>([]);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage<WebSocketMessageData> | null>(null);

    useEffect(() => {
        if (url) {
            const ws = new WebSocket(url);

            ws.onopen = () => {
                console.log('WebSocket connected');
                if (lobbyId) {
                    if (lobbyMode === 'create') {
                        const initialMessage: WebSocketMessage<CreateLobbyData> = {
                            type: WebSocketMessageType.CreateLobby,
                            lobbyId: lobbyId,
                            data: {
                                lobbySettings: {
                                    text,
                                    time,
                                    maxPlayerCount,
                                },
                                players: [],
                                status: LobbyStatus.Waiting,
                            },
                        };

                        ws.send(JSON.stringify(initialMessage));
                    } else if (lobbyMode === 'join') {
                        const initialMessage: WebSocketMessage<JoinLobbyData> = {
                            type: WebSocketMessageType.JoinLobby,
                            lobbyId: lobbyId,
                            data: {
                                players: [],
                            },
                        };

                        ws.send(JSON.stringify(initialMessage));
                    }
                }
            };

            ws.onmessage = (event) => {
                const parsedMessage: WebSocketMessage<WebSocketMessageData> = JSON.parse(event.data);
                setLastMessage(parsedMessage);
                console.log(parsedMessage);
                setMessages((prevMessages) => [...prevMessages, parsedMessage]);
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
    }, [url, text, maxPlayerCount, time, lobbyMode, lobbyId]);

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
