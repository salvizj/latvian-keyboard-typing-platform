import { useEffect, useState } from 'react';
import getPoetTexts from '../api/getPoetTexts';
import { PoetText } from '../types';

export const useGetPoetTexts = () => {
    const [poetTexts, setPoetTexts] = useState<PoetText[]>([]);
    const [poetTextsError, setPoetTextsError] = useState<string | null>(null);

    useEffect(() => {
        getPoetTexts()
            .then((data) => {
                setPoetTexts(data);
                console.log(data);
            })
            .catch(() => {
                setPoetTextsError('Error fetching lesson text');
            });
    }, []);

    return { poetTexts, poetTextsError };
};
