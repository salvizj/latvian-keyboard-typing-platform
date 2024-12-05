import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HistoryTypes } from '../types';
import { capitalize } from '../utils/capitalizeString';
import DefaultPanel from '../components/utils/DefaultPanel';
import translate from '../utils/translate';
import { validateHistoryFilters } from '../utils/validateHistoryFilters';

const HistoryPage = () => {
    const { language } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [dateFrom, setDateFrom] = useState(searchParams.get('dateFrom') || '');
    const [dateTill, setDateTill] = useState(searchParams.get('dateTill') || '');

    // Effect to handle setting initial parameters and validation
    useEffect(() => {
        const newParams = {
            type: searchParams.get('type') || HistoryTypes.TypingTest,
            page: searchParams.get('page') || '0',
            dateFrom: searchParams.get('dateFrom') || '',
            dateTill: searchParams.get('dateTill') || '',
        };

        // If parameters are missing, set defaults
        if (
            !searchParams.get('type') ||
            !searchParams.get('page') ||
            !searchParams.get('dateFrom') ||
            !searchParams.get('dateTill')
        ) {
            setSearchParams(newParams);
        }

        // Validate parameters
        const validationError = validateHistoryFilters(
            newParams.page,
            newParams.type,
            newParams.dateFrom,
            newParams.dateTill
        );
        if (validationError) {
            setErrorMessage(validationError);
        } else {
            setErrorMessage('');
        }
    }, [searchParams, setSearchParams]);

    const handleTypeChange = (type: HistoryTypes) => {
        setSearchParams({ type, dateFrom, dateTill });
        validateParams(type, dateFrom, dateTill);
    };

    const handleDateChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setDate: React.Dispatch<React.SetStateAction<string>>
    ) => {
        const value = event.target.value;
        const isDateFrom = event.target.name === 'dateFrom';
        const newDateFrom = isDateFrom ? value : dateFrom;
        const newDateTill = isDateFrom ? dateTill : value;

        setDate(value);

        setSearchParams({
            type: searchParams.get('type') || HistoryTypes.TypingTest,
            dateFrom: newDateFrom,
            dateTill: newDateTill,
        });

        validateParams(searchParams.get('type'), newDateFrom, newDateTill);
    };

    // validate the given parameters
    const validateParams = (type: string | null, dateFrom: string, dateTill: string) => {
        const validationError = validateHistoryFilters(searchParams.get('page'), type, dateFrom, dateTill);
        if (validationError) {
            setErrorMessage(validationError);
        } else {
            setErrorMessage('');
        }
    };

    const currentType = searchParams.get('type');

    return (
        <DefaultPanel className="h-full" width="max-w-6xl">
            <div className="flex gap-4 justify-center items-center flex-col">
                <h1 className="text-3xl font-bold mb-6 text-center">{capitalize(translate('history', language))}</h1>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingTest)}
                        className={`flex items-center justify-center rounded-lg p-2 min-w-[12rem] secondary ${
                            currentType === 'typingTest'
                                ? 'bg-color-primary text-color-third'
                                : 'bg-color-third text-color-primary'
                        } hover:bg-color-secondary`}
                    >
                        {capitalize(translate('typing_test', language))}
                    </button>
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingRace)}
                        className={`flex items-center justify-center rounded-lg p-2 min-w-[12rem] secondary ${
                            currentType === 'typingRace'
                                ? 'bg-color-primary text-color-third'
                                : 'bg-color-third text-color-primary'
                        } hover:bg-color-secondary`}
                    >
                        {capitalize(translate('typing_race', language))}
                    </button>
                </div>
                {errorMessage && (
                    <p className="text-sm text-red-500">{capitalize(translate(errorMessage, language))}</p>
                )}
                <div className="flex flex-row gap-4 mt-6">
                    <div>
                        <label htmlFor="dateFrom" className="text-lg font-semibold">
                            {capitalize(translate('date_from', language))}:
                        </label>
                        <input
                            id="dateFrom"
                            name="dateFrom"
                            type="date"
                            min="2024-11-10"
                            max="2025-11-10"
                            value={dateFrom}
                            onChange={(e) => handleDateChange(e, setDateFrom)}
                            className="p-2 border rounded-lg min-w-[12rem] ml-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateTill" className="text-lg font-semibold">
                            {capitalize(translate('date_till', language))}:
                        </label>
                        <input
                            id="dateTill"
                            name="dateTill"
                            type="date"
                            min="2024-11-10"
                            max="2025-11-10"
                            value={dateTill}
                            onChange={(e) => handleDateChange(e, setDateTill)}
                            className="p-2 border rounded-lg min-w-[12rem] ml-2"
                        />
                    </div>
                </div>
            </div>
        </DefaultPanel>
    );
};

export default HistoryPage;
