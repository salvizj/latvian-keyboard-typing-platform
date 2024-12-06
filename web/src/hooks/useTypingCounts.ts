import { useState, useEffect } from 'react';
import getTypingTestsAndRacesCount from '../api/getTypingTestsAndRacesCount';

const useTypingCounts = (userId: string | null) => {
    const [testsCount, setTestsCount] = useState<number | null>(null);
    const [racesCount, setRacesCount] = useState<number | null>(null);
    const [fetchingCountError, setFetchingCountError] = useState<string | null>(null);
    const [loadingCountData, setLoadingCountData] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setTestsCount(null);
                setRacesCount(null);
                setFetchingCountError(null);
                setLoadingCountData(false);
                return;
            }

            setLoadingCountData(true);
            try {
                const data = await getTypingTestsAndRacesCount(userId);
                setTestsCount(data.testsCount);
                setRacesCount(data.racesCount);
                setFetchingCountError(null);
            } catch (error) {
                console.error('Error fetching typing counts:', error);
                setFetchingCountError('error_failed_to_fetch_typing_and_race_count');
            } finally {
                setLoadingCountData(false);
            }
        };

        fetchData();
    }, [userId]);

    return { testsCount, racesCount, fetchingCountError, loadingCountData };
};

export default useTypingCounts;
