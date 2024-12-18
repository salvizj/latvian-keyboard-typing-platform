import { useEffect, useState } from 'react';
import getLatvianWords from '../api/getLatvianWords';

const useGetLatvianWords = () => {
    const [latvianWords, setLatvianWords] = useState<string[]>([]);
    const [latvianWordsError, setLatvianWordsError] = useState<string | null>(null);
    const [latvianWordsLoading, setLatvianWordsLoading] = useState<boolean>(true);
    useEffect(() => {
        getLatvianWords()
            .then((data) => {
                setLatvianWords(data);
                setLatvianWordsLoading(false);
            })
            .catch(() => {
                setLatvianWordsError('Error fetching latvian words');
                setLatvianWordsLoading(false);
            });
    }, []);

    return { latvianWords, latvianWordsError, latvianWordsLoading };
};

export default useGetLatvianWords;
