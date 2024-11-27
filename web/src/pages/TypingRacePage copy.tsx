import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import { useGetPoetTexts } from '../hooks/useGetPoetTexts';
import Lobby from '../components/typingRace/Lobby';
import { useWebSocketMenagement } from '../hooks/useWebSocketMenagement';
import Keyboard from '../components/keyboard/Keyboard';
import { JoinLobbyData, LobbyStatus, Player, ProgressData, WebSocketMessageType } from '../types';
import PlayerProgressBox from '../components/typingRace/PlayerProgressBox';
import { useAuth } from '@clerk/clerk-react';
import constructWebSocketMessage from '../utils/constructWebsocktMessage';
import { useTypingRaceContext } from '../context/OptionsContext';

const PROGRESS_UPDATE_INTERVAL = 2000;

const TypingRacePage = () => {
    const {isOptionsSet, wsUrl, setWsUrl, time, maxPlayerCount, setProcentsOfTextTyped, userIdOrEmpty, timeLeft, time, setLobbyId. setLobbyRaceStatus, procentsOfTextTyped, lobbyId, setPlayerData, setText, setTime, setTimeLeft, lobbyMode} = useTypingRaceContext()

    const { lastMessage, messages, sendMessage, isSocketOpen } = useWebSocketMenagement({
        url: wsUrl || '',
    });
    console.log(
        'time:',
        time,
        'timeLeft:',
        timeLeft,
        'lobbyRaceStatus:',
        lobbyRaceStatus,
        'isRace:',
        isRace,
        'wpm:',
        wpm,
        'setProcentsOfTextTyped:',
        setProcentsOfTextTyped
    );

    // initialize WebSocket URL when options are set
    useEffect(() => {
        if (isOptionsSet && !wsUrl) {
            const url = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;
            setWsUrl(url);
        }
    }, [isOptionsSet, wsUrl]);

    // handle lobby creation and joining
    useEffect(() => {
        if (!isSocketOpen || !isOptionsSet) return;

        const basePlayerData = {
            username,
            playerId: '',
            userId: userIdOrEmpty,
        };

        if (lobbyMode === 'create') {
            const createLobbyMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.CreateLobby,
                lobbySettings: {
                    time,
                    maxPlayerCount,
                    text,
                },
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOptionsSet, isSocketOpen, lobbyMode]);

    // handle race status changes
    useEffect(() => {
        const startGameMessage = messages.find((msg) => msg.type === WebSocketMessageType.StartRace);
        const endGameMessage = messages.find((msg) => msg.type === WebSocketMessageType.EndRace);

        if (startGameMessage) {
            setLobbyRaceStatus(LobbyStatus.InProgress);
        }
        if (endGameMessage) {
            setLobbyRaceStatus(LobbyStatus.Finished);
        }
    }, [messages]);

    // handle WebSocket message updates
    useEffect(() => {
        if (!lastMessage) return;

        if (lastMessage.type === WebSocketMessageType.CreateLobby) {
            setLobbyId(lastMessage.lobbyId);
        }
        if (lastMessage.type === WebSocketMessageType.JoinLobby) {
            setLobbyId(lastMessage.lobbyId);
            const lobbySettings = lastMessage.data as JoinLobbyData;
            setText(lobbySettings.lobbySettings.text);
            setTime(lobbySettings.lobbySettings.time);
            setTimeLeft(lobbySettings.lobbySettings.time);
            setPlayerData(lobbySettings.players);
        }
        if (lastMessage.type === WebSocketMessageType.Progress && lastMessage.data) {
            const progressData = lastMessage.data as ProgressData;
            setPlayerData(progressData.players);
        }
    }, [lastMessage, text, time]);

    // handle game progress updates
    useEffect(() => {
        if (lobbyRaceStatus !== LobbyStatus.InProgress) return;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, lobbyRaceStatus]);

    // handle race end
    useEffect(() => {
        if (lobbyRaceStatus === LobbyStatus.InProgress && isSocketOpen && timeLeft === 0) {
            const endRaceMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.EndRace,
                lobbyId,
            });

            if (endRaceMessage) sendMessage(endRaceMessage);
        }
    }, [timeLeft, isSocketOpen, lobbyId, lobbyRaceStatus, sendMessage]);

    return (
        <>
            {!isOptionsSet && lobbyRaceStatus === LobbyStatus.Waiting && (
                <OptionBox
                    title="typing_race"
                    startText="go_to_type_racing_lobby"
                />
            )}
            {lobbyRaceStatus === LobbyStatus.Waiting && isOptionsSet && (
                <Lobby
                    sendMessage={sendMessage}
                    title="typing_race_lobby"
                />
            )}
            {lobbyRaceStatus === LobbyStatus.InProgress && (
                <>
                    <Keyboard
                       
                    />
                    <PlayerProgressBox  />
                </>
            )}
        </>
    );
};

export default TypingRacePage;
