import { useEffect, useState } from 'react';
import getPoetTexts from '../api/getPoetTexts';
import { PoetText } from '../types';

export const useGetPoetTexts = () => {
    const [poetTexts, setPoetTexts] = useState<PoetText[]>([]);
    const [poetTexstsError, setPoetTexstsError] = useState<string | null>(null);

    useEffect(() => {
        getPoetTexts()
            .then((data) => {
                setPoetTexts(data);
                console.log(data);
            })
            .catch(() => {
                setPoetTexstsError('Error fetching lesson text');
            });
    }, []);
    return { poetTexts, poetTexstsError };
};
