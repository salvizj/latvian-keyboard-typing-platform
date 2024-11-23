import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import { useGetPoetTexts } from '../hooks/useGetPoetTexts';
import Lobby from '../components/typingRace/Lobby';
import { useWebSocketMenagement } from '../hooks/useWebSocketMenagement';
import Keyboard from '../components/keyboard/Keyboard';
import { LobbyStatus, WebSocketMessageType } from '../types';

const TypingRacePage = () => {
    const isRace = true;
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [lobbyId, setLobbyId] = useState<string>('');
    const [lobbyMode, setLobbyMode] = useState<'create' | 'join'>('create');
    const [maxPlayerCount, setMaxPlayerCount] = useState(2);
    const [isCustomText, setIsCustomText] = useState(false);
    const [customText, setCustomText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [wsUrl, setWsUrl] = useState<string | null>(null);
    const { poetTexts, poetTextsError } = useGetPoetTexts();
    const [lobbyRaceStatus, setLobbyRaceStatus] = useState(LobbyStatus.Waiting);
    const { lastMessage, messages, sendMessage } = useWebSocketMenagement({
        url: wsUrl || '',
        text,
        time,
        maxPlayerCount,
        lobbyId,
        lobbyMode,
    });

    useEffect(() => {
        if (!isOptionsSet && isOptionsSet && !wsUrl) {
            const url = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;
            setWsUrl(url);
        }
    }, [isOptionsSet, wsUrl]);

    useEffect(() => {
        const startGameMessage = messages.filter((msg) => msg.type === WebSocketMessageType.StartGame);
        const endGameMessage = messages.filter((msg) => msg.type === WebSocketMessageType.EndGame);

        if (startGameMessage.length > 0) {
            setLobbyRaceStatus(LobbyStatus.InProgress);
        }

        if (endGameMessage.length > 0) {
            setLobbyRaceStatus(LobbyStatus.Finished);
        }
    }, [messages]);

    return (
        <>
            {!isOptionsSet && lobbyRaceStatus === LobbyStatus.Waiting && (
                <OptionBox
                    start={isOptionsSet}
                    lobbyId={lobbyId}
                    title="typing_race"
                    setStart={setIsOptionsSet}
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
                        sendMessage={sendMessage}
                        title="typing_race_lobby"
                        lobbyData={lastMessage}
                        lobbyId={lobbyId}
                    />
                </div>
            )}
            {lobbyRaceStatus === LobbyStatus.InProgress && <Keyboard text={text} time={time} raceMode={isRace} />}
        </>
    );
};

export default TypingRacePage;
