import { useState, useEffect } from 'react';
import getTypingTestsAndRacesCount from '../api/getTypingTestsAndRacesCount';
import getTypingTestsAndRaces from '../api/getTypingTestsAndRaces';
import { TypingTestOrRaceData } from '../types';

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
        if (!userId) {
            setFetchingCountError(null);
            setLoadingCountData(false);
            return;
        }

        setLoadingCountData(true);

        getTypingTestsAndRacesCount(userId, dateFrom, dateTill)
            .then((countData) => {
                setTestsCount(countData.testsCount);
                setRacesCount(countData.racesCount);
                setFetchingCountError(null);

                // Fetch detailed typing tests and races data
                setData(null);
                setLoadingTypingData(true);
                setFetchingTypingDataError(null);

                if (page >= 0 && type && type !== '' && itemsPerPage >= 0) {
                    getTypingTestsAndRaces(userId, page, type, itemsPerPage, dateFrom, dateTill)
                        .then((detailedData) => {
                            setData(detailedData);
                        })
                        .catch((err) => {
                            setFetchingTypingDataError('error_failed_to_fetch_typing_data');
                            console.error(err);
                        })
                        .finally(() => {
                            setLoadingTypingData(false);
                        });
                } else {
                    setLoadingTypingData(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching typing counts:', error);
                setFetchingCountError('error_failed_to_fetch_typing_and_race_count');
                setTestsCount(0);
                setRacesCount(0);
            })
            .finally(() => {
                setLoadingCountData(false);
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
