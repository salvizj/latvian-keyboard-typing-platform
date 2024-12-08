import { useState, useEffect } from 'react';
import { TypingTestOrRaceData } from '../types';
import getTypingTestsAndRaces from '../api/getTypingTestsAndRaces';

const useGetTypingTestsAndRaces = (
    userId: string | null,
    page: number | null,
    type: string | null,
    itemsPerPage: number | null
) => {
    const [data, setData] = useState<TypingTestOrRaceData | null>(null);
    const [loadingTypingData, setLoadingTypingData] = useState<boolean>(false);
    const [fetchingTypingDataError, setFetchingTypingDataError] = useState<string | null>(null);

    useEffect(() => {
        setData(null);
        setLoadingTypingData(true);
        setFetchingTypingDataError(null);

        if (userId && page !== null && page >= 0 && type && itemsPerPage && itemsPerPage >= 0) {
            getTypingTestsAndRaces(userId, page, type, itemsPerPage)
                .then((response) => {
                    setData(response);
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
    }, [userId, type, page, itemsPerPage]);

    return { data, loadingTypingData, fetchingTypingDataError };
};
export default useGetTypingTestsAndRaces;
