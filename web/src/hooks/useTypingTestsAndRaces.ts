import { useState, useEffect } from 'react';
import { TypingTestOrRaceData } from '../types';
import axios from 'axios';

const useTypingTestsAndRaces = (userId: string | null, count: number | null, type: string | null) => {
    const [data, setData] = useState<TypingTestOrRaceData | null>(null);
    const [loadingTypingData, setLoadingTypingData] = useState<boolean>(false);
    const [fetchingTypingDataError, setFetchingTypingDataError] = useState<string | null>(null);

    useEffect(() => {
        setData(null);
        setLoadingTypingData(true);
        setFetchingTypingDataError(null);

        if (userId && count && type) {
            const fetchData = async () => {
                try {
                    const response = await axios.post<TypingTestOrRaceData>('/api/get-typing-tests-and-races', {
                        userId,
                        count: count.toString(),
                        type,
                    });

                    setData(response.data);
                } catch (err) {
                    setFetchingTypingDataError('error_failed_to_fetch_typing_data');
                    console.error(err);
                } finally {
                    setLoadingTypingData(false);
                }
            };

            fetchData();
        } else {
            setLoadingTypingData(false);
        }
    }, [userId, count, type]);

    return { data, loadingTypingData, fetchingTypingDataError };
};

export default useTypingTestsAndRaces;
