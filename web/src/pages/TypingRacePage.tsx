import { useEffect, useState } from 'react';
import OptionBox from '../components/utils/OptionBox';
import Lobby from '../components/typingRace/Lobby';
import Keyboard from '../components/keyboard/Keyboard';
import { JoinLobbyData, LobbyStatus, Player, ProgressData, WebSocketMessageType } from '../types';
import PlayerProgressBox from '../components/typingRace/PlayerProgressBox';
import Countdown from '../components/utils/Countdown';
import { useOptions } from '../context/OptionsContext';
import useAuthStatus from '../hooks/useAuthStatus';
import useLobbyStatusMenagement from '../hooks/useLobbyStatusMenagement';
import useHandleWebSocketMessages from '../hooks/useHandleWebSocketMessages';
import useWebSocketMenagement from '../hooks/useWebSocketMenagement';
// import { useTyping } from '../context/TypingContext';

const TypingRacePage = () => {
    const isRace = true;
    const wsUrl = `ws://localhost:${import.meta.env.VITE_PORT}/ws`;

    const { text, setText, time, setTime, lobbyId, setLobbyId, username, timeLeft, setTimeLeft } = useOptions();

    // const { wpm, setProcentsOfTextTyped } = useTyping();
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [lobbyStatus, setLobbyStatus] = useState<LobbyStatus>(LobbyStatus.Waiting);
    const [playerData, setPlayerData] = useState<Player[] | null>(null);
    const { userId } = useAuthStatus();
    const userIdOrEmpty = userId ? userId : '';

    // connects to ws
    const { lastMessage, messages, sendMessage, isSocketOpen } = useWebSocketMenagement({
        wsUrl,
        isOptionsSet,
    });

    // changes lobby status based on recived wsmessages
    useLobbyStatusMenagement({ messages, setLobbyStatus });

    // handle ws messaging
    useHandleWebSocketMessages({
        isSocketOpen,
        userIdOrEmpty,
        lobbyStatus,
        sendMessage,
        isOptionsSet,
    });

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
    }, [lastMessage, setLobbyId, setText, setTime, setTimeLeft, text, time]);

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
            {lobbyStatus === LobbyStatus.InProgress && timeLeft != null && time != null && (
                <>
                    <Countdown start={isOptionsSet} />
                    <PlayerProgressBox playerData={playerData || []} />
                    <Keyboard />
                </>
            )}
        </>
    );
};

export default TypingRacePage;
