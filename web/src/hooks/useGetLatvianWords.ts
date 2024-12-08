import { useEffect, useState } from 'react';
import getLatvianWords from '../api/getLatvianWords';

const useGetLatvianWords = () => {
    const [latvianWords, setLatvianWords] = useState<string[]>([]);
    const [latvianWordsError, setLatvianWordsError] = useState<string | null>(null);

    useEffect(() => {
        getLatvianWords()
            .then((data) => {
                setLatvianWords(data);
            })
            .catch(() => {
                setLatvianWordsError('Error fetching latvian words');
            });
    }, []);

    return { latvianWords, latvianWordsError };
};
export default useGetLatvianWords;
