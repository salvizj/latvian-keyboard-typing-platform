import { useState, useEffect } from 'react';
import getTypingTestsAndRacesCount from '../api/getTypingTestsAndRacesCount';
import getTypingTestsAndRaces from '../api/getTypingTestsAndRaces';
import { HistoryTypes, TypingTestOrRaceData } from '../types';

const useGetTypingData = (
    userId: string | null,
    dateFrom: string,
    dateTill: string,
    page: number,
    type: string | null,
    itemsPerPage: number
) => {
    const [testsCount, setTestsCount] = useState(0);
    const [racesCount, setRacesCount] = useState(0);
    const [fetchingCountError, setFetchingCountError] = useState<string | null>(null);
    const [loadingCountData, setLoadingCountData] = useState<boolean>(false);
    const [data, setData] = useState<TypingTestOrRaceData | null>(null);
    const [loadingTypingData, setLoadingTypingData] = useState<boolean>(false);
    const [fetchingTypingDataError, setFetchingTypingDataError] = useState<string | null>(null);

    useEffect(() => {
        // validate all required parameters
        const isValidParams = userId && page >= 0 && type && type !== '' && itemsPerPage >= 0;

        if (!isValidParams) {
            setFetchingCountError(null);
            setLoadingCountData(false);
            setLoadingTypingData(false);
            setData(null);
            setFetchingTypingDataError(null);
            return;
        }

        setLoadingCountData(true);
        setLoadingTypingData(true);

        // only proceed with API calls if all parameters are valid
        getTypingTestsAndRacesCount(userId, dateFrom, dateTill)
            .then((countData) => {
                setTestsCount(countData.testsCount);
                setRacesCount(countData.racesCount);
                setFetchingCountError(null);

                return getTypingTestsAndRaces(userId, page, type, itemsPerPage, dateFrom, dateTill);
            })
            .then((detailedData) => {
                if (detailedData.type === HistoryTypes.TypingTest || detailedData.type === HistoryTypes.TypingRace) {
                    setData(detailedData);
                }
                setFetchingTypingDataError(null);
            })
            .catch((error) => {
                console.error('Error fetching typing data:', error);
                setFetchingCountError('error_failed_to_fetch_typing_and_race_count');
                setFetchingTypingDataError('error_failed_to_fetch_typing_data');
                setTestsCount(0);
                setRacesCount(0);
                setData(null);
            })
            .finally(() => {
                setLoadingCountData(false);
                setLoadingTypingData(false);
            });
    }, [userId, dateFrom, dateTill, page, type, itemsPerPage]);

    return {
        testsCount,
        racesCount,
        fetchingCountError,
        loadingCountData,
        data,
        loadingTypingData,
        fetchingTypingDataError,
    };
};

export default useGetTypingData;
