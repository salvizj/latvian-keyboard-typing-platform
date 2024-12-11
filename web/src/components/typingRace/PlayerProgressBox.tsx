import React, { useEffect, useState } from 'react';
import { Player } from '../../types';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type PlayerStatsListProps = {
    playerData: Player[];
};

const PlayerStatsList: React.FC<PlayerStatsListProps> = ({ playerData }) => {
    const { language } = useLanguage();
    const [displayData, setDisplayData] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const updatedDisplay = playerData.map((player) => (
            <div
                key={player.username}
                className="flex flex-col gap-2 text-color-primary justify-center items-center text-lg"
            >
                <div className="text-color-primary flex flex-row gap-2">
                    <p className="font-bold">{translate('username', language)}:</p> {player.username}
                    <p className="font-bold">{translate('procents_of_text_typed', language)}:</p>{' '}
                    {player.procentsOfTextTyped ?? 0}%<p className="font-bold">{translate('place', language)}:</p>{' '}
                    {player.place}
                </div>
            </div>
        ));
        setDisplayData(updatedDisplay);
    }, [playerData, language]);

    return (
        <div>
            <div>{displayData}</div>
        </div>
    );
};

export default PlayerStatsList;
