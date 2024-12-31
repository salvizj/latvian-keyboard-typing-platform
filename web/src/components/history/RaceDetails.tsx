import { FC } from 'react';
import { Lobby, PlayerRole } from '../../types';
import { MdClose } from 'react-icons/md';
import translate from '../../utils/translate';

type RaceDetailsProps = {
    race: Lobby;
    language: string;
    handleClose: () => void;
};

const RaceDetails: FC<RaceDetailsProps> = ({ race, language, handleClose }) => {
    const lobbySettings = race.lobbySettings;
    return (
        <div className="flex flex-col mt-4 bg-transparent relative p-4">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-3xl hover:text-color-primary-hover-text z-20"
            >
                <MdClose />
            </button>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-5 gap-4">
                    <div className="p-2 font-semibold">{translate('username', language)}</div>
                    <div className="p-2 font-semibold">{translate('role', language)}</div>
                    <div className="p-2 font-semibold">{translate('wpm', language)}</div>
                    <div className="p-2 font-semibold">{translate('mistake_count', language)}</div>
                    <div className="p-2 font-semibold">{translate('place', language)}</div>
                </div>
                <div className="space-y-2">
                    {race.players.map((player) => (
                        <div key={player.playerId} className="grid grid-cols-5 gap-4 p-2 border-t">
                            <div className="p-2">{player.username}</div>
                            <div className="p-2">
                                {player.role
                                    ? translate(player.role, language)
                                    : translate(PlayerRole.Player, language)}
                            </div>

                            <div className="p-2">{player.wpm ?? 0}</div>
                            <div className="p-2">{player.mistakeCount ?? 0}</div>
                            <div className="p-2">{player.place}</div>
                        </div>
                    ))}
                </div>
            </div>
            {lobbySettings ? (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">{translate('text_settings', language)}</h3>
                    <div>
                        {translate('text_type', language)}: {translate(lobbySettings.textType, language)}
                    </div>
                    <div>
                        {translate('time', language)}: {lobbySettings.time}s
                    </div>
                    {lobbySettings.customText && (
                        <div>
                            {translate('custom_text', language)}: {lobbySettings.customText}
                        </div>
                    )}
                    {lobbySettings.writersText && (
                        <>
                            <div>
                                {translate('writers_first_name', language)}:{' '}
                                {lobbySettings.writersText.writersFirstName}
                            </div>
                            <div>
                                {translate('writers_last_name', language)}: {lobbySettings.writersText.writersLastName}
                            </div>
                            <div>
                                {translate('fragments_name', language)}: {lobbySettings.writersText.fragmentName}
                            </div>
                            <div>
                                {translate('fragments_content', language)}:{' '}
                                {lobbySettings.writersText?.fragmentsContent}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <p className="text-red-500">{translate('settings_not_found', language)}</p>
            )}
        </div>
    );
};

export default RaceDetails;
