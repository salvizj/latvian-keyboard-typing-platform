import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { useLanguage } from '../../context/LanguageContext';

type LobbyOptionsProps = {
    setLobbyId?: (lobbyId: string) => void;
    setLobbyMode?: (lobbyMode: 'create' | 'join') => void;
    lobbyMode?: 'create' | 'join';
    lobbyId?: string;
    setUsername?: (username: string) => void;
    username?: string;
};

const LobbyOptions: React.FC<LobbyOptionsProps> = ({
    setLobbyId,
    setLobbyMode,
    lobbyMode,
    lobbyId,
    setUsername,
    username,
}) => {
    const handleModeChange = (newMode: 'create' | 'join') => {
        if (setLobbyMode) {
            setLobbyMode(newMode);
        }
    };
    const { language } = useLanguage();
    return (
        <div className="mb-4 flex flex-col justify-center">
            <div className="mb-4">
                <div className="mb-2">
                    <input
                        type="checkbox"
                        id="joinMode"
                        checked={lobbyMode === 'join'}
                        onChange={() => handleModeChange(lobbyMode === 'create' ? 'join' : 'create')}
                        className="mr-2"
                    />
                    <label htmlFor="joinMode" className="text-primary">
                        {capitalize(translate('join_lobby', language))}
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        type="checkbox"
                        id="createMode"
                        checked={lobbyMode === 'create'}
                        onChange={() => handleModeChange(lobbyMode === 'join' ? 'create' : 'join')}
                        className="mr-2"
                    />
                    <label htmlFor="createMode" className="text-primary">
                        {capitalize(translate('create_lobby', language))}
                    </label>
                </div>
            </div>
            <div className="mt-2">
                <label htmlFor="username" className="text-primary">
                    {capitalize(translate('enter_username', language))}
                </label>
                <input
                    type="text"
                    id="username"
                    value={username || ''}
                    onChange={(e) => {
                        if (setUsername) {
                            setUsername(e.target.value);
                        }
                    }}
                    className="border p-2 mt-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                    placeholder={capitalize(translate('enter_username', language))}
                />
            </div>
            {lobbyMode === 'join' && (
                <div>
                    <div className="mb-4 mt-4">
                        <label htmlFor="lobbyId" className="text-primary">
                            {capitalize(translate('enter_lobby_id', language))}
                        </label>
                        <input
                            type="text"
                            id="lobbyId"
                            value={lobbyId || ''}
                            onChange={(e) => {
                                if (setLobbyId) {
                                    setLobbyId(e.target.value);
                                }
                            }}
                            className="border p-2 mt-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                            placeholder={capitalize(translate('enter_lobby_id', language))}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LobbyOptions;
