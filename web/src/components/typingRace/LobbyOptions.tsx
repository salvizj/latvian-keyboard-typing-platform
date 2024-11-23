import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';

type LobbyOptionsProps = {
    setLobbyId: (lobbyId: string) => void;
    setLobbyMode: (lobbyMode: 'create' | 'join') => void;
    lobbyMode: 'create' | 'join';
    lobbyId: string;
    language: string;
};

const LobbyOptions: React.FC<LobbyOptionsProps> = ({ setLobbyId, setLobbyMode, lobbyMode, lobbyId, language }) => {
    useEffect(() => {
        if (lobbyMode === 'create') {
            setLobbyId(uuidv4());
        }
    }, [lobbyMode, setLobbyId]);

    const handleModeChange = (newMode: 'create' | 'join') => {
        setLobbyMode(newMode);
        if (newMode === 'create') {
            setLobbyId(uuidv4());
        } else {
            setLobbyId('');
        }
    };

    return (
        <div className="mb-6">
            <div className="flex items-center">
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
            <div className="flex items-center mt-2">
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
                            onChange={(e) => setLobbyId(e.target.value)}
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
