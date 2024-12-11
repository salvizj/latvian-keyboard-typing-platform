import { FC, useState } from 'react';
import { TypingTestOrRaceData, TypingTest, HistoryTypes } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import DefaultPanel from '../utils/DefaultPanel';
import { MdClose } from 'react-icons/md';

type TypingDataDisplayProps = {
    data: TypingTestOrRaceData | null;
    loading: boolean;
    error: string | null;
    page: number;
    userId: string | null;
};

const ITEMS_PER_PAGE = 5;
const TypingDataDisplay: FC<TypingDataDisplayProps> = ({ data, loading, error, page, userId }) => {
    const { language } = useLanguage();
    const [close, setClose] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleOpen = (index: number) => {
        setClose(false);
        const adjustedIndex = page > 0 ? index + page * ITEMS_PER_PAGE : index;
        setSelectedIndex(adjustedIndex);
    };

    const handleClose = () => {
        setClose(true);
        setSelectedIndex(null);
    };

    if (loading) {
        return <p className="text-primary-color mt-1 mb-1 text-sm">{translate('loading', language)}</p>;
    }

    if (error) {
        return <p className="text-red-500 mt-1 mb-1 text-sm">{translate(error, language)}</p>;
    }

    if (!close && selectedIndex !== null && data) {
        return (
            <>
                <DefaultPanel width="max-w-6xl">
                    <div className="flex flex-col mt-4">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-3xl hover:text-color-primary-hover-text"
                        >
                            <MdClose />
                        </button>

                        {data.type === HistoryTypes.TypingTest && selectedIndex !== null && (
                            <div className="space-y-4 p-4 mt-4">
                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-5">
                                        <div className="p-2 font-semibold">{translate('test_id', language)}</div>
                                        <div className="p-2 font-semibold">{translate('wpm', language)}</div>
                                        <div className="p-2 font-semibold">{translate('mistake_count', language)}</div>
                                    </div>

                                    <div className="grid grid-cols-5 gap-4 p-2 border-t">
                                        <div className="p-2">{data.tests[selectedIndex].typingTestId}</div>
                                        <div className="p-2">{data.tests[selectedIndex].wpm}</div>
                                        <div className="p-2">{data.tests[selectedIndex].mistakeCount}</div>
                                    </div>
                                </div>

                                {data.settings && data.settings[selectedIndex] && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold text-lg mb-3">
                                            {translate('text_settings', language)}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="font-semibold">{translate('text_type', language)}:</p>
                                                <p>{translate(data.settings[selectedIndex].textType, language)}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{translate('time', language)}:</p>
                                                <p>{data.settings[selectedIndex].time}s</p>
                                            </div>
                                            {data.settings[selectedIndex].customText && (
                                                <div>
                                                    <p className="font-semibold">
                                                        {translate('custom_text', language)}:
                                                    </p>
                                                    <p className="break-words">
                                                        {data.settings[selectedIndex].customText}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {data.type === HistoryTypes.TypingRace && (
                            <div className="space-y-4 p-2 mt-4">
                                <div className="overflow-x-auto">
                                    <div className="grid grid-cols-5">
                                        <div className="p-2 font-semibold">{translate('race_id', language)}</div>
                                        <div className="p-2 font-semibold">{translate('username', language)}</div>
                                        <div className="p-2 font-semibold">{translate('wpm', language)}</div>
                                        <div className="p-2 font-semibold">{translate('mistake_count', language)}</div>
                                        <div className="p-2 font-semibold">{translate('place', language)}</div>
                                    </div>
                                    <div className="space-y-2">
                                        {data.players.map((player) => (
                                            <div key={player.playerId} className="grid grid-cols-5 gap-4 p-2 border-t">
                                                <div className="p-2">{player.lobbyid}</div>
                                                <div className="p-2">{player.username}</div>
                                                <div className="p-2">{player.wpm}</div>
                                                <div className="p-2">{player.mistakeCount}</div>
                                                <div className="p-2">{player.place}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {data.settings && data.settings[selectedIndex] && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold text-lg mb-3">
                                            {translate('text_settings', language)}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="font-semibold">{translate('text_type', language)}:</p>
                                                <p>{translate(data.settings[selectedIndex].textType, language)}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold">{translate('time', language)}:</p>
                                                <p>{data.settings[selectedIndex].time}s</p>
                                            </div>
                                            {data.settings[selectedIndex].customText && (
                                                <div>
                                                    <p className="font-semibold">
                                                        {translate('custom_text', language)}:
                                                    </p>
                                                    <p className="break-words">
                                                        {data.settings[selectedIndex].customText}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </DefaultPanel>
            </>
        );
    }

    if (data) {
        if (data.type === HistoryTypes.TypingTest) {
            return (
                <div className="space-y-4 p-4 mt-4">
                    {data.tests.length === 0 || data.tests.length === 0 ? (
                        <p className="text-primary-color p-2 text-sm">{translate('test_count_0', language)}</p>
                    ) : (
                        data.tests.map((test: TypingTest, index: number) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleOpen(index)}
                                    className="flex flex-row gap-20 text-color-primary border-color-primary hover:border-color-secondary cursor-pointer p-4"
                                >
                                    <p>{index + 1}</p>
                                    <p>
                                        {translate('wpm', language)}: {test.wpm}
                                    </p>
                                    <p>
                                        {translate('mistake_count', language)}: {test.mistakeCount}
                                    </p>
                                    <p>
                                        {translate('date', language)}: {test.date}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            );
        } else if (data.type === HistoryTypes.TypingRace) {
            // get only user date
            const playersToDisplay = data.players.filter((player) => player.userId === userId);

            return (
                <div className="space-y-4 p-4 mt-4">
                    {data.races.length === 0 || data.races.length === 0 ? (
                        <p className="text-primary-color p-2 text-sm">{translate('race_count_0', language)}</p>
                    ) : (
                        data.races.map((race, raceIndex) => {
                            // find the player for the current race based on userId
                            const playerForRace = playersToDisplay.find(
                                (player) => player.lobbyid === race.lobbyId && player.userId === userId
                            );

                            return playerForRace ? (
                                <div
                                    key={playerForRace.playerId}
                                    onClick={() => handleOpen(raceIndex)}
                                    className="flex flex-row gap-10 text-color-primary border-color-primary hover:border-color-secondary cursor-pointer p-4"
                                >
                                    <p>{playerForRace.place}</p>
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
                </div>
            );
        }
    }

    return null;
};
export default TypingDataDisplay;
