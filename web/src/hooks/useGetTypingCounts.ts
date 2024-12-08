import { useState, useEffect } from 'react';
import getTypingTestsAndRacesCount from '../api/getTypingTestsAndRacesCount';

export const useGetTypingCounts = (userId: string | null) => {
    const [testsCount, setTestsCount] = useState(0);
    const [racesCount, setRacesCount] = useState(0);
    const [fetchingCountError, setFetchingCountError] = useState<string | null>(null);
    const [loadingCountData, setLoadingCountData] = useState<boolean>(false);

    useEffect(() => {
        if (!userId) {
            setFetchingCountError(null);
            setLoadingCountData(false);
            return;
        }

        setLoadingCountData(true);

        getTypingTestsAndRacesCount(userId)
            .then((data) => {
                setTestsCount(data.testsCount);
                setRacesCount(data.racesCount);
                setFetchingCountError(null);
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
    }, [userId]);

    return { testsCount, racesCount, fetchingCountError, loadingCountData };
};
