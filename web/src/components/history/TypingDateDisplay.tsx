import { FC, useState } from 'react';
import { HistoryTypes, TypingTestOrRaceData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import RaceList from './RaceList';
import TestList from './TestList';
import TestDetails from './TestDetails';
import RaceDetails from './RaceDetails';

type TypingDataDisplayProps = {
    data: TypingTestOrRaceData | null;
    loading: boolean;
    error: string | null;
    userId: string | null;
};

const TypingDataDisplay: FC<TypingDataDisplayProps> = ({ data, loading, error, userId }) => {
    const { language } = useLanguage();
    const [close, setClose] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleOpen = (index: number) => {
        setClose(false);
        const adjustedIndex = index;
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
            <div className="w-full border border-secondary-color rounded-md mt-4">
                {data.type === HistoryTypes.TypingTest && (
                    <TestDetails test={data.tests[selectedIndex]} language={language} handleClose={handleClose} />
                )}
                {data.type === HistoryTypes.TypingRace && (
                    <RaceDetails race={data.races[selectedIndex]} language={language} handleClose={handleClose} />
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4 mt-4">
            {data?.type === HistoryTypes.TypingTest && (
                <TestList tests={data.tests} handleOpen={handleOpen} language={language} />
            )}
            {data?.type === HistoryTypes.TypingRace && (
                <RaceList races={data.races} handleOpen={handleOpen} userId={userId} language={language} />
            )}
        </div>
    );
};

export default TypingDataDisplay;
