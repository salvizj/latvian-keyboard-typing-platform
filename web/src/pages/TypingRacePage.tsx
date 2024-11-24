import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import { useGetPoetTexts } from '../hooks/useGetPoetTexts';
import Lobby from '../components/typingRace/Lobby';
import { useWebSocketMenagement } from '../hooks/useWebSocketMenagement';
import Keyboard from '../components/keyboard/Keyboard';
import { LobbyStatus, Player, ProgressData, WebSocketMessage, WebSocketMessageType } from '../types';
import PlayerProgressBox from '../components/typingRace/PlayerProgressBox';
import { useLanguage } from '../context/LanguageContext';

const TypingRacePage = () => {
    const isRace = true;
    const { language } = useLanguage();
    const [wpm, setWpm] = useState(0);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [procentsOfTextTyped, setProcentsOfTextTyped] = useState(0);
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [lobbyId, setLobbyId] = useState<string>('');
    // const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [lobbyMode, setLobbyMode] = useState<'create' | 'join'>('create');
    const [maxPlayerCount, setMaxPlayerCount] = useState(2);
    const [isCustomText, setIsCustomText] = useState(false);
    const [customText, setCustomText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [wsUrl, setWsUrl] = useState<string | null>(null);
    const { poetTexts, poetTextsError } = useGetPoetTexts();
    const [lobbyRaceStatus, setLobbyRaceStatus] = useState(LobbyStatus.Waiting);
    const [playerData, setPlayerData] = useState<Player[] | null>(null);
    const userId = '';
    const { lastMessage, messages, sendMessage } = useWebSocketMenagement({
        url: wsUrl || '',
        text,
        time,
        maxPlayerCount,
        lobbyId,
        lobbyMode,
        username,
        userId,
    });

    useEffect(() => {
        if (isOptionsSet && !wsUrl) {
            const url = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;
            setWsUrl(url);
        }
    }, [isOptionsSet, wsUrl]);

    useEffect(() => {
        const startGameMessage = messages.filter((msg) => msg.type === WebSocketMessageType.StartRace);
        const endGameMessage = messages.filter((msg) => msg.type === WebSocketMessageType.EndRace);

        if (startGameMessage.length > 0) {
            setLobbyRaceStatus(LobbyStatus.InProgress);
        }

        if (endGameMessage.length > 0) {
            setLobbyRaceStatus(LobbyStatus.Finished);
        }
    }, [messages]);

    useEffect(() => {
        // initially, we send an empty lobbyId since the server generates it
        // the client will then set the lobbyId for future use
        if (lastMessage?.type === WebSocketMessageType.CreateLobby) {
            setLobbyId(lastMessage.lobbyId);
        }
        // getting progress data from all players
        if (lastMessage?.type === WebSocketMessageType.Progress) {
            // Update the player data from the message
            const progressData = lastMessage.data as ProgressData;
            setPlayerData(progressData.players);
        }
        // players didin`t set text or time so we get them from websocket message
        if (!time && !text) {
            if (lastMessage?.data && 'lobbySettings' in lastMessage.data) {
                const lobbySettings = lastMessage.data.lobbySettings;
                setText(lobbySettings?.text);
                setTime(lobbySettings?.time);
            }
        }
        // when we get players
        if (lastMessage?.data && 'players' in lastMessage.data) {
            const players = lastMessage.data.players;
            setPlayerData(players);
        }
    }, [lastMessage, text, time]);

    // send current wpm, mistakes to server every 2 sec
    useEffect(() => {
        const interval = setInterval(() => {
            // Check if time and timeLeft are different to avoid unnecessary sends
            if (time !== timeLeft) {
                const progressMessage: WebSocketMessage<ProgressData> = {
                    type: WebSocketMessageType.Progress,
                    lobbyId: lobbyId,
                    status: lobbyRaceStatus,
                    data: {
                        players: [
                            {
                                username: username,
                                playerId: '',
                                userId: userId || '',
                                mistakeCount: mistakeCount,
                                wpm: wpm,
                                ProcentsOfTextTyped: procentsOfTextTyped,
                            },
                        ],
                    },
                };
                sendMessage(progressMessage);
            }
        }, 2000);

        // cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, [time, timeLeft, lobbyId, lobbyRaceStatus, wpm, procentsOfTextTyped, mistakeCount, sendMessage, username]);

    return (
        <>
            {!isOptionsSet && lobbyRaceStatus === LobbyStatus.Waiting && (
                <OptionBox
                    username={username}
                    setUsername={setUsername}
                    lobbyId={lobbyId}
                    title="typing_race"
                    setIsOptionsSet={setIsOptionsSet}
                    setText={setText}
                    setTime={setTime}
                    lobbyMode={lobbyMode}
                    setLobbyId={setLobbyId}
                    setLobbyMode={setLobbyMode}
                    setMaxPlayerCount={setMaxPlayerCount}
                    startText="go_to_type_racing_lobby"
                    time={time}
                    isCustomText={isCustomText}
                    customText={customText}
                    maxPlayerCount={maxPlayerCount}
                    selectedText={selectedText}
                    setIsCustomText={setIsCustomText}
                    setCustomText={setCustomText}
                    setSelectedText={setSelectedText}
                    poetTexts={poetTexts}
                    poetTextsError={poetTextsError}
                    isRace={isRace}
                />
            )}
            {lobbyRaceStatus === LobbyStatus.Waiting && isOptionsSet && (
                <div>
                    <Lobby
                        playerData={playerData}
                        lobbyRaceStatus={lobbyRaceStatus}
                        username={username}
                        sendMessage={sendMessage}
                        title="typing_race_lobby"
                        lobbyId={lobbyId}
                    />
                </div>
            )}
            {lobbyRaceStatus === LobbyStatus.InProgress && (
                <>
                    <Keyboard
                        text={text}
                        time={time}
                        raceMode={isRace}
                        sendMessage={sendMessage}
                        setMistakeCount={setMistakeCount}
                        mistakeCount={mistakeCount}
                        wpm={wpm}
                        setWpm={setWpm}
                        setTimeLeft={setTimeLeft}
                        setProcentsOfTextTyped={setProcentsOfTextTyped}
                    />
                    <PlayerProgressBox playerData={playerData || []} language={language} />
                </>
            )}
        </>
    );
};

export default TypingRacePage;
