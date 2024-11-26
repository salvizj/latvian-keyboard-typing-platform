import { useState, useEffect, useCallback } from 'react';
import { WebSocketMessage, WebSocketMessageData } from '../types';

type UseWebSocketManagementParams = {
    url: string | null;
};
export const useWebSocketMenagement = ({ url }: UseWebSocketManagementParams) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<WebSocketMessage<WebSocketMessageData>[]>([]);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage<WebSocketMessageData> | null>(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false);

    useEffect(() => {
        if (url && !socket) {
            const ws = new WebSocket(url);

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
    }, [lastMessage, socket, url]);

    const sendMessage = useCallback(
        (message: WebSocketMessage<WebSocketMessageData>) => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log('sent messages client', message);
                socket.send(JSON.stringify(message));
            }
        },
        [socket]
    );

    return {
        messages,
        lastMessage,
        isSocketOpen,
        sendMessage,
    };
};
