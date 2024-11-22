import { useState, useEffect, useCallback } from 'react';
import { WebSocketMessage } from '../types';

export const useWebSocketMenagement = (url: string | null) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage[]>([]);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

    useEffect(() => {
        if (url) {
            const ws = new WebSocket(url);

            ws.onopen = () => {
                console.log('WebSocket connected');
            };

            ws.onmessage = (event) => {
                const parsedMessage: WebSocketMessage = JSON.parse(event.data);
                setLastMessage(parsedMessage);
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
    }, [url]);

    const sendMessage = useCallback(
        (message: WebSocketMessage) => {
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
