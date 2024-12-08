import { useEffect, useState } from 'react';
import getPoetTexts from '../api/getPoetTexts';
import { PoetText } from '../types';

const useGetPoetTexts = (poetTextId?: number) => {
    const [poetTexts, setPoetTexts] = useState<PoetText[]>([]);
    const [poetTextsError, setPoetTextsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoetTexts = () => {
            if (poetTextId != null && !isNaN(poetTextId)) {
                getPoetTexts(poetTextId)
                    .then((data) => {
                        if (!data) {
                            setPoetTextsError('error_fetching_poet_text');
                            setPoetTexts([]);
                        } else if (Array.isArray(data)) {
                            setPoetTexts(data);
                            setPoetTextsError(null);
                        } else {
                            setPoetTexts([]);
                            setPoetTextsError('error_fetching_poet_text');
                        }
                    })
                    .catch(() => {
                        setPoetTextsError('error_fetching_poet_texts');
                        setPoetTexts([]);
                    });
            } else {
                getPoetTexts()
                    .then((data) => {
                        if (Array.isArray(data)) {
                            setPoetTexts(data);
                            setPoetTextsError(null);
                        } else {
                            setPoetTexts([]);
                            setPoetTextsError('error_fetching_poet_texts');
                        }
                    })
                    .catch(() => {
                        setPoetTextsError('error_fetching_poet_texts');
                        setPoetTexts([]);
                    });
            }
        };

        fetchPoetTexts();
    }, [poetTextId]);

    return { poetTexts, poetTextsError };
};
export default useGetPoetTexts;
