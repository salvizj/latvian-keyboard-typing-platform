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
        const updatedDisplay = [
            <div className="flex font-bold gap-4 text-center">
                <p className="flex-1">{translate('username', language)}</p>
                <p className="flex-1">{translate('percentage_of_text_typed', language)}</p>
                <p className="flex-1">{translate('place', language)}</p>
            </div>,
            ...playerData.map((player) => (
                <div key={player.username} className="flex">
                    <p className="flex-1 flex-wrap">{player.username}</p>
                    <p className="flex-1 justify-center items-center text-center">
                        {player.percentageOfTextTyped ?? 0}%
                    </p>
                    <p className="flex-1 justify-center items-center text-center">{player.place}</p>
                </div>
            )),
        ];
        setDisplayData(updatedDisplay);
    }, [playerData, language]);

    return <div className="text-base text-color-primary bg-color-third p-1 max-w-3xl">{displayData}</div>;
};

export default PlayerStatsList;
