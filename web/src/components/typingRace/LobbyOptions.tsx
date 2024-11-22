import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { useLanguage } from '../../context/LanguageContext';

type LobbyOptionsProps = {
    setLobbyId: (lobbyId: string) => void;
    setLobbyMode: (lobbyMode: 'create' | 'join') => void;
    lobbyMode: 'create' | 'join';
};

const LobbyOptions: React.FC<LobbyOptionsProps> = ({ setLobbyId, setLobbyMode, lobbyMode }) => {
    const [lobbyId, setLobbyIdState] = useState<string>('');
    const { language } = useLanguage();
    const [haveCreatedUuid, setHaveCreatedUuid] = useState(false);

    const handleLobbyAction = () => {
        if (lobbyMode === 'join') {
            setLobbyId(lobbyId);
            console.log(`Joining lobby with ID: ${lobbyId}`);
        } else {
            if (!haveCreatedUuid) {
                const newLobbyId = uuidv4();
                setLobbyId(newLobbyId);
                setHaveCreatedUuid(true);
            }

            console.log(`Created lobby with ID: ${lobbyId}`);
        }
    };

    const handleLobbyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLobbyIdState(e.target.value);
        handleLobbyAction();
    };

    return (
        <div className="mb-6">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="joinMode"
                    checked={lobbyMode === 'join'}
                    onChange={() => setLobbyMode(lobbyMode === 'create' ? 'join' : 'create')}
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
                    onChange={() => setLobbyMode(lobbyMode === 'join' ? 'create' : 'join')}
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
                            value={lobbyId}
                            onChange={handleLobbyIdChange}
                            className="border p-2 mt-2 w-full rounded-md primary-bg third-text placeholder-third-text text-md"
                            placeholder={capitalize(translate('enter_lobby_id', language))}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LobbyOptions;
