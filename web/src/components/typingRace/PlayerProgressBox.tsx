import React from 'react';
import { Player } from '../../types';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type PlayerStatsListProps = {
    playerData: Player[];
};

const PlayerStatsList: React.FC<PlayerStatsListProps> = ({ playerData }) => {
    const { language } = useLanguage();
    return (
        <div>
            <h1>{translate('progress', language)}</h1>
            <ul>
                {playerData.map((player) => (
                    <li key={player.playerId}>
                        <div>
                            <strong>{translate('username', language)}:</strong> {player.username}
                        </div>
                        <div>
                            <strong>{translate('wpm', language)}:</strong> {player.wpm ?? 'N/A'}
                        </div>
                        <div>
                            <strong>{translate('mistake_count', language)}:</strong> {player.mistakeCount ?? 'N/A'}
                        </div>
                        <div>
                            <strong>{translate('progress', language)}:</strong> {player.procentsOfTextTyped ?? 0}%
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerStatsList;
