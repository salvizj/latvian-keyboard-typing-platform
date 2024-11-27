import { useState, useEffect } from 'react';
import { WebSocketMessage, WebSocketMessageData } from '../types';

type UseWebSocketManagementParams = {
    wsUrl: string | null;
    isOptionsSet: boolean;
};

export const useWebSocketMenagement = ({ wsUrl, isOptionsSet }: UseWebSocketManagementParams) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage<WebSocketMessageData>[]>([]);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage<WebSocketMessageData> | null>(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false);

    useEffect(() => {
        if (wsUrl && !socket && isOptionsSet) {
            const ws = new WebSocket(wsUrl);

            ws.onopen = () => {
                setIsSocketOpen(true);
            };

            ws.onmessage = (event) => {
                const parsedMessage: WebSocketMessage<WebSocketMessageData> = JSON.parse(event.data);
                setLastMessage(parsedMessage);
                console.log('receives msg', parsedMessage);

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
    }, [isOptionsSet, lastMessage, socket, wsUrl]);

    const sendMessage = (message: WebSocketMessage<WebSocketMessageData>) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log('sent messages client', message);
            socket.send(JSON.stringify(message));
        }
    };

    return {
        messages,
        lastMessage,
        isSocketOpen,
        sendMessage,
    };
};
