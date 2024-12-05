import { useEffect, useState } from 'react';
import getPoetTexts from '../api/getPoetTexts';
import { PoetText } from '../types';

export const useGetPoetTexts = () => {
    const [poetTexts, setPoetTexts] = useState<PoetText[]>([]);
    const [poetTextsError, setPoetTextsError] = useState<string | null>(null);

    useEffect(() => {
        getPoetTexts()
            .then((data) => {
                if (data && Array.isArray(data)) {
                    setPoetTexts(data);
                } else {
                    setPoetTexts([]);
                }
            })
            .catch(() => {
                setPoetTextsError('error_fetching_poet_text');
            });
    }, []);

    return { poetTexts, poetTextsError };
};
