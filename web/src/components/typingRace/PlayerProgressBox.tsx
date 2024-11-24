import React from 'react';
import { Player } from '../../types';
import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';

type PlayerProgressBoxProps = {
    playerData: Player[];
    language: string;
};

const PlayerProgressBox: React.FC<PlayerProgressBoxProps> = ({ playerData, language }) => {
    return (
        <div>
            <h2>{capitalize(translate('progress', language))}</h2>
            <ul>
                {playerData.map((player) => (
                    <li key={player.playerId}>
                        <div>
                            <strong>{capitalize(translate('username', language))}:</strong> {player.username}
                        </div>
                        <div>
                            <strong>{capitalize(translate('wpm', language))}:</strong> {player.wpm ?? 'N/A'}
                        </div>
                        <div>
                            <strong>{capitalize(translate('mistake_count', language))}:</strong>{' '}
                            {player.mistakeCount ?? 'N/A'}
                        </div>
                        <div>
                            <strong>{capitalize(translate('progress', language))}:</strong>{' '}
                            {player.ProcentsOfTextTyped ?? 0}%
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerProgressBox;
