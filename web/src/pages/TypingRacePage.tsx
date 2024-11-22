import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import { useGetPoetTexts } from '../hooks/useGetPoetTexts';
import Lobby from '../components/typingRace/Lobby';
import { useWebSocketMenagement } from '../hooks/useWebSocketMenagement';

const TypingRacePage = () => {
    const isRace = true;
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [raceStart, setRaceStart] = useState(false);
    const [lobbyId, setLobbyId] = useState('');
    const [lobbyMode, setLobbyMode] = useState<'create' | 'join'>('create');
    const [maxPlayerCount, setMaxPlayerCount] = useState(2);
    const [isCustomText, setIsCustomText] = useState(false);
    const [customText, setCustomText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [wsUrl, setWsUrl] = useState<string | null>(null);
    const { poetTexts, poetTextsError } = useGetPoetTexts();

    const { lastMessage } = useWebSocketMenagement(wsUrl || '');

    useEffect(() => {
        if (!raceStart && isOptionsSet && !wsUrl) {
            const url = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;
            setWsUrl(url);
        }
    }, [raceStart, isOptionsSet, wsUrl]);

    console.log(lastMessage, text, isOptionsSet, lobbyId);

    return (
        <>
            {!isOptionsSet && (
                <OptionBox
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
            {!raceStart && isOptionsSet && (
                <div>
                    <Lobby setRaceStart={setRaceStart} title="lol" />
                </div>
            )}
        </>
    );
};

export default TypingRacePage;
