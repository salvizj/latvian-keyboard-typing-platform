import { FC } from 'react';
import { Lobby } from '../../types';
import translate from '../../utils/translate';

type RaceListProps = {
    races: Lobby[];
    handleOpen: (index: number) => void;
    userId: string | null;
    language: string;
};

const RaceList: FC<RaceListProps> = ({ races, handleOpen, userId, language }) => (
    <>
        {races.length === 0 ? (
            <p className="text-primary-color p-2 text-sm">{translate('race_count_0', language)}</p>
        ) : (
            races.map((race, index) => {
                const playerForRace = race.players.find((player) => player.userId === userId);
                return playerForRace ? (
                    <div
                        key={playerForRace.playerId}
                        onClick={() => handleOpen(index)}
                        className="flex flex-row gap-10 text-color-primary border-color-primary hover:border-color-secondary cursor-pointer p-4"
                    >
                        <p>{index + 1}</p>
                        <p>
                            {translate('username', language)}: {playerForRace.username}
                        </p>
                        <p>
                            {translate('wpm', language)}: {playerForRace.wpm} WPM
                        </p>
                        <p>
                            {translate('mistake_count', language)}: {playerForRace.mistakeCount}
                        </p>
                        <p>
                            {translate('place', language)}: {playerForRace.place}
                        </p>
                        <p>
                            {translate('date', language)}: {race.date}
                        </p>
                    </div>
                ) : null;
            })
        )}
    </>
);

export default RaceList;
