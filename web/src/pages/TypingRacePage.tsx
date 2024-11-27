import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import Lobby from '../components/typingRace/Lobby';
import { useWebSocketMenagement } from '../hooks/useWebSocketMenagement';
import Keyboard from '../components/keyboard/Keyboard';
import { JoinLobbyData, LobbyStatus, Player, ProgressData, WebSocketMessageType } from '../types';
import PlayerProgressBox from '../components/typingRace/PlayerProgressBox';
import { useAuth } from '@clerk/clerk-react';
import Countdown from '../components/utils/Countdown';
import { useOptions } from '../context/OptionsContext';
import { useTyping } from '../context/TypingContext';
import { useLobbyStatusMenagement } from '../hooks/useLobbyStatusMenagement';
import { useHandleWebSocketMessages } from '../hooks/useHandleWebSocketMessages';

const TypingRacePage = () => {
    const isRace = true;
    const wsUrl = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;

    const { text, setText, time, setTime, lobbyId, setLobbyId, username } = useOptions();
    const { wpm, setProcentsOfTextTyped } = useTyping();

    const [timeLeft, setTimeLeft] = useState<number>(time);
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [lobbyStatus, setLobbyStatus] = useState<LobbyStatus>(LobbyStatus.Waiting);
    const [playerData, setPlayerData] = useState<Player[] | null>(null);
    const { userId } = useAuth();
    const userIdOrEmpty = userId ?? '';

    const { lastMessage, messages, sendMessage, isSocketOpen } = useWebSocketMenagement({
        wsUrl,
        isOptionsSet,
    });

    useLobbyStatusMenagement({ messages, setLobbyStatus });
    useHandleWebSocketMessages({
        isSocketOpen,
        userIdOrEmpty,
        timeLeft,
        lobbyStatus,
        sendMessage,
        isOptionsSet,
    });

    console.log(
        'time:',
        time,
        'timeLeft:',
        timeLeft,
        'lobbyStatus:',
        lobbyStatus,
        'isRace:',
        isRace,
        'wpm:',
        wpm,
        'setProcentsOfTextTyped:',
        setProcentsOfTextTyped
    );

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
    }, [lastMessage, setLobbyId, setText, setTime, text, time]);

    return (
        <>
            {!isOptionsSet && lobbyStatus === LobbyStatus.Waiting && (
                <OptionBox
                    title="typing_race"
                    setIsOptionsSet={setIsOptionsSet}
                    startText="go_to_type_racing_lobby"
                    isRace={isRace}
                />
            )}
            {lobbyStatus === LobbyStatus.Waiting && isOptionsSet && (
                <Lobby
                    playerData={playerData}
                    username={username}
                    sendMessage={sendMessage}
                    title="typing_race_lobby"
                    lobbyId={lobbyId}
                />
            )}
            {lobbyStatus === LobbyStatus.InProgress && (
                <>
                    <Countdown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
                    <PlayerProgressBox playerData={playerData || []} />
                    <Keyboard
                        timeLeft={timeLeft}
                        isRace={isRace}
                        sendMessage={sendMessage}
                        setTimeLeft={setTimeLeft}
                        setProcentsOfTextTyped={setProcentsOfTextTyped}
                    />
                </>
            )}
        </>
    );
};

export default TypingRacePage;
