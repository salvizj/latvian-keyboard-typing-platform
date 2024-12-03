import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HistoryTypes } from '../types';
import { capitalize } from '../utils/capitalizeString';
import DefaultPanel from '../components/utils/DefaultPanel';
import translate from '../utils/translate';

const HistoryPage = () => {
    const { language } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();

    // set initial type parameter if none exists
    useEffect(() => {
        const newParams = {
            type: searchParams.get('type') || HistoryTypes.TypingTest,
            page: searchParams.get('page') || '0',
        };

        if (!searchParams.get('type') || !searchParams.get('page')) {
            setSearchParams(newParams);
        }
    }, [searchParams, setSearchParams]);

    const handleTypeChange = (type: HistoryTypes) => {
        setSearchParams({ type });
    };

    const currentType = searchParams.get('type');

    return (
        <DefaultPanel className="h-full" width="max-w-6xl">
            <div className="flex gap-4 justify-center items-center flex-col">
                <h1 className="text-3xl font-bold mb-6 text-center">{capitalize(translate('history', language))}</h1>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingTest)}
                        className={`flex items-center justify-center p-4 rounded-lg min-w-[16rem] border secondary ${
                            currentType === 'typingTest' ? 'bg-color-third text-color-primary border-gray-600' : ''
                        } hover:text-color-third-hover-text`}
                    >
                        {capitalize(translate('typing_test', language))}
                    </button>
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingRace)}
                        className={`flex items-center justify-center p-4 rounded-lg min-w-[16rem] border secondary ${
                            currentType === 'typingRace' ? 'bg-color-third text-color-primary border-gray-600' : ''
                        } hover:text-color-third-hover-text`}
                    >
                        {capitalize(translate('typing_race', language))}
                    </button>
                </div>
            </div>
        </DefaultPanel>
    );
};

export default HistoryPage;
