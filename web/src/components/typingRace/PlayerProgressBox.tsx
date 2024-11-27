import React from 'react';
import { Player } from '../../types';
import { capitalize } from '../../utils/capitalizeString';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type PlayerStatsListProps = {
    playerData: Player[];
};

const PlayerStatsList: React.FC<PlayerStatsListProps> = ({ playerData }) => {
    const { language } = useLanguage();
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
                            {player.procentsOfTextTyped ?? 0}%
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerStatsList;
