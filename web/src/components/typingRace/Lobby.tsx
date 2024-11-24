import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    WebSocketMessage,
    Player,
    WebSocketMessageType,
    WebSocketMessageData,
    PlayerRole,
    LobbyStatus,
    StartRaceData,
} from '../../types';
import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';
import CopyToClipboard from '../utils/CopyToClipboar';

type LobbyProps = {
    title: string;
    playerData?: Player[] | null;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
    lobbyId: string;
    username: string;
    lobbyRaceStatus: LobbyStatus;
};

const Lobby: React.FC<LobbyProps> = ({ sendMessage, title, playerData, lobbyId, username, lobbyRaceStatus }) => {
    const { language } = useLanguage();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        // to check if you are the owner of lobby
        if (playerData) {
            const yourDetails = playerData.find((player) => player.username === username);

            setIsOwner(yourDetails?.role === PlayerRole.Leader);
        }
    }, [playerData, username]);

    const handleStartRace = () => {
        const startMessage: WebSocketMessage<StartRaceData> = {
            type: WebSocketMessageType.StartRace,
            lobbyId: lobbyId,
            status: lobbyRaceStatus,
            data: {},
        };

        sendMessage(startMessage);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>
                <div className="flex flex-col mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {capitalize(translate('current_lobby_id', language))}: {lobbyId}
                    </h3>
                    <CopyToClipboard text={lobbyId} language={language} />
                </div>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{capitalize(translate('players', language))}:</h3>
                    <ul>
                        {playerData &&
                            playerData.map((player) => (
                                <li key={player.playerId} className="mb-1">
                                    <span className="font-bold">{capitalize(translate('username', language))}:</span>{' '}
                                    {player.username},
                                    <span className="font-bold ml-2">{capitalize(translate('role', language))}:</span>{' '}
                                    {player.role && translate(player.role, language)}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="mt-4">
                    {isOwner ? (
                        <button
                            onClick={handleStartRace}
                            className="w-full text-text-color-primary hover:text-color-primary border-text-color-primary"
                        >
                            {capitalize(translate('start_typing_race', language))}
                        </button>
                    ) : (
                        <div className="text-center text-gray-600">
                            {capitalize(translate('wait_for_owner_to_start_the_race', language))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Lobby;
