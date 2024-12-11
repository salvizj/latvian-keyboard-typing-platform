import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { HistoryTypes } from '../types';
import DefaultPanel from '../components/utils/DefaultPanel';
import translate from '../utils/translate';
import { validateHistoryFilters } from '../utils/validateHistoryFilters';
import TypingDataDisplay from '../components/history/TypingDateDisplay';
import useAuthStatus from '../hooks/useAuthStatus';
import useGetTypingData from '../hooks/useGetTypingData';

const ITEMS_PER_PAGE = 5;

const HistoryPage = () => {
    const { userId } = useAuthStatus();
    const { language } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const [validateError, setValidateError] = useState('');
    // initial parameters and validation
    useEffect(() => {
        const params = {
            type: searchParams.get('type') || HistoryTypes.TypingTest,
            page: searchParams.get('page') || '0',
            dateFrom: searchParams.get('dateFrom') || '',
            dateTill: searchParams.get('dateTill') || '',
        };

        if (
            !searchParams.get('type') ||
            !searchParams.get('page') ||
            !searchParams.get('dateFrom') ||
            !searchParams.get('dateTill')
        ) {
            setSearchParams(params);
        }

        const errorMsg = validateHistoryFilters(params.page, params.type, params.dateFrom, params.dateTill);

        if (errorMsg) setValidateError(errorMsg);
    }, [searchParams, setSearchParams]);

    // update search params and validate
    const handleChange = (updates: { type?: string; page?: string; dateFrom?: string; dateTill?: string }) => {
        const newParams = {
            type: updates.type || searchParams.get('type') || HistoryTypes.TypingTest,
            page: updates.page || searchParams.get('page') || '0',
            dateFrom: updates.dateFrom || searchParams.get('dateFrom') || '',
            dateTill: updates.dateTill || searchParams.get('dateTill') || '',
        };

        setSearchParams(newParams);
        validateHistoryFilters(newParams.page, newParams.type, newParams.dateFrom, newParams.dateTill);
    };

    const handleTypeChange = (type: HistoryTypes) => {
        handleChange({ type });
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        handleChange({ [name]: value });
    };

    const currentType = searchParams.get('type');
    const currentPage = parseInt(searchParams.get('page') || '0', 10);
    const dateFrom = searchParams.get('dateFrom') || '';
    const dateTill = searchParams.get('dateTill') || '';

    const updatePage = (newPage: number) => {
        setSearchParams({ ...searchParams, page: newPage.toString() });
    };

    const handlePageChange = (direction: 'left' | 'right') => {
        let newPage = currentPage;
        if (direction === 'right') {
            newPage = currentPage + 1;
        } else if (direction === 'left' && currentPage > 0) {
            newPage = currentPage - 1;
        }
        updatePage(newPage);
    };
    const { data, loadingTypingData, fetchingTypingDataError, racesCount, testsCount } = useGetTypingData(
        userId,
        dateFrom,
        dateTill,
        currentPage,
        currentType,
        ITEMS_PER_PAGE
    );
    const count = currentType === 'typingTest' ? testsCount : racesCount;
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return (
        <DefaultPanel className="h-full" width="max-w-6xl">
            <div className="flex gap-4 justify-center items-center flex-col">
                <h1 className="text-3xl font-bold mb-6 text-center">{translate('history', language)}</h1>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingTest)}
                        className={`flex items-center justify-center rounded-lg p-2 min-w-[12rem] secondary ${
                            currentType === HistoryTypes.TypingTest
                                ? 'bg-color-primary text-color-third'
                                : 'bg-color-third text-color-primary'
                        } hover:bg-color-secondary`}
                    >
                        {translate('typing_test', language)}
                    </button>
                    <button
                        onClick={() => handleTypeChange(HistoryTypes.TypingRace)}
                        className={`flex items-center justify-center rounded-lg p-2 min-w-[12rem] secondary ${
                            currentType === HistoryTypes.TypingRace
                                ? 'bg-color-primary text-color-third'
                                : 'bg-color-third text-color-primary'
                        } hover:bg-color-secondary`}
                    >
                        {translate('typing_race', language)}
                    </button>
                </div>

                {validateError && <p className="text-sm text-red-500">{translate(validateError, language)}</p>}

                <div className="flex flex-row gap-4 mt-6">
                    <div>
                        <label htmlFor="dateFrom" className="text-lg font-semibold">
                            {translate('date_from', language)}:
                        </label>
                        <input
                            id="dateFrom"
                            name="dateFrom"
                            type="date"
                            min="2024-11-10"
                            max="2025-11-10"
                            value={dateFrom}
                            onChange={handleDateChange}
                            className="p-2 border rounded-lg min-w-[12rem] ml-2 bg-color-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="dateTill" className="text-lg font-semibold">
                            {translate('date_till', language)}:
                        </label>
                        <input
                            id="dateTill"
                            name="dateTill"
                            type="date"
                            min="2024-11-10"
                            max="2025-11-10"
                            value={dateTill}
                            onChange={handleDateChange}
                            className="p-2 border rounded-lg min-w-[12rem] ml-2 bg-color-primary"
                        />
                    </div>
                </div>

                {!data && !loadingTypingData && (
                    <p className="text-sm text-red-500">{translate('error_failed_to_fetch_typing_data', language)}</p>
                )}

                {data && (
                    <TypingDataDisplay
                        data={data}
                        loading={loadingTypingData}
                        error={fetchingTypingDataError}
                        userId={userId}
                        page={currentPage}
                    />
                )}
            </div>

            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                <div className="flex items-center bg-transparent">
                    {currentPage > 0 && (
                        <button
                            onClick={() => handlePageChange('left')}
                            className="py-2 rounded-lg bg-color-third text-color-primary hover:bg-color-secondary"
                        >
                            &lt;
                        </button>
                    )}
                    <span className="mx-4 text-lg font-semibold min-w-[2rem] text-center">{currentPage}</span>
                    {currentPage < totalPages - 1 && (
                        <button
                            onClick={() => handlePageChange('right')}
                            className="py-2 rounded-lg bg-color-third text-color-primary hover:bg-color-secondary"
                        >
                            &gt;
                        </button>
                    )}
                </div>
            </div>
        </DefaultPanel>
    );
};

export default HistoryPage;
