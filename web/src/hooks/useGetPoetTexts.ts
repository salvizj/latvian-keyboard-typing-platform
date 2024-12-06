import { useEffect, useState } from 'react';
import getPoetTexts from '../api/getPoetTexts';
import { PoetText } from '../types';

export const useGetPoetTexts = (poetTextId?: number) => {
    const [poetTexts, setPoetTexts] = useState<PoetText[]>([]);
    const [poetTextsError, setPoetTextsError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoetTexts = async () => {
            try {
                let data;
                console.log(poetTextId);
                if (poetTextId) {
                    data = await getPoetTexts(poetTextId);
                    if (!data) {
                        setPoetTextsError('Poet text not found');
                    } else {
                        setPoetTexts(data);
                    }
                } else {
                    data = await getPoetTexts();
                    if (Array.isArray(data)) {
                        setPoetTexts(data);
                    } else {
                        setPoetTexts([]);
                    }
                }
            } catch {
                setPoetTextsError('Error fetching poet texts');
            }
        };

        fetchPoetTexts();
    }, [poetTextId]);

    return { poetTexts, poetTextsError };
};
