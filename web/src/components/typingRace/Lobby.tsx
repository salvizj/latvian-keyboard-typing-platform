import { useLanguage } from '../../context/LanguageContext';
import {
    WebSocketMessage,
    Player,
    WebSocketMessageType,
    StartGameData,
    CreateLobbyData,
    JoinLobbyData,
    WebSocketMessageData,
} from '../../types';
import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';

type LobbyProps = {
    title: string;
    lobbyData?: WebSocketMessage<WebSocketMessageData> | null;
    sendMessage: (message: WebSocketMessage<WebSocketMessageData>) => void;
    lobbyId: string;
};

const Lobby: React.FC<LobbyProps> = ({ sendMessage, title, lobbyData, lobbyId }) => {
    const { language } = useLanguage();

    const players: Player[] =
        lobbyData?.type === WebSocketMessageType.CreateLobby || lobbyData?.type === WebSocketMessageType.JoinLobby
            ? 'players' in lobbyData.data
                ? (lobbyData.data as CreateLobbyData | JoinLobbyData).players
                : []
            : [];
    const handleStartRace = () => {
        const startMessage: WebSocketMessage<StartGameData> = {
            type: WebSocketMessageType.StartGame,
            lobbyId: lobbyId,
            data: { startGame: true },
        };

        sendMessage(startMessage);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

                {players.length > 0 ? (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{capitalize(translate('players', language))}:</h3>
                        <ul>
                            {players.map((player) => (
                                <li key={player.playerId} className="mb-1">
                                    <span className="font-bold">{capitalize(translate('id', language))}:</span>{' '}
                                    {player.playerId},
                                    <span className="font-bold ml-2">{capitalize(translate('role', language))}:</span>{' '}
                                    {player.role}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-sm italic text-center">{capitalize(translate('no_players', language))}</p>
                )}

                <button
                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:text-color-third-hover-text border secondary"
                    onClick={() => handleStartRace()}
                >
                    {capitalize(translate('start_typing_race', language))}
                </button>
            </div>
        </div>
    );
};

export default Lobby;
