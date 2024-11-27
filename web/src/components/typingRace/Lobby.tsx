import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WebSocketMessage, Player, WebSocketMessageType, WebSocketMessageData, PlayerRole } from '../../types';
import { capitalize } from '../../utils/capitalizeString';
import translate from '../../utils/translate';
import CopyToClipboard from '../utils/CopyToClipboar';
import constructWebSocketMessage from '../../utils/constructWebsocktMessage';

type LobbyProps = {
    title: string;
    playerData?: Player[] | null;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
    lobbyId: string;
    username: string;
};

const Lobby: React.FC<LobbyProps> = ({ sendMessage, title, playerData, lobbyId, username }) => {
    const { language } = useLanguage();
    const [isOwner, setIsOwner] = useState(false);
    const [isEnoughPlayers, setIsEnoughPlayers] = useState(false);
    useEffect(() => {
        // to check if you are the owner of lobby
        if (playerData) {
            const yourDetails = playerData.find((player) => player.username === username);

            setIsEnoughPlayers(playerData.length >= 2);

            setIsOwner(yourDetails?.role === PlayerRole.Leader);
        }
    }, [playerData, username]);

    const handleStartRace = () => {
        const startMessage = constructWebSocketMessage({
            messageType: WebSocketMessageType.StartRace,
            lobbyId: lobbyId,
        });

        if (startMessage) sendMessage(startMessage);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>
                <div className="flex flex-col mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {capitalize(translate('current_lobby_id', language))}: {lobbyId}
                    </h3>
                    <CopyToClipboard text={lobbyId} />
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
                    {isOwner && isEnoughPlayers && (
                        <button
                            onClick={handleStartRace}
                            className="bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary"
                        >
                            {capitalize(translate('start_typing_race', language))}
                        </button>
                    )}
                    {!isEnoughPlayers && (
                        <div className="text-center text-gray-600">
                            {capitalize(translate('not_enough_players_to_start', language))}
                        </div>
                    )}
                    {!isOwner && (
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
