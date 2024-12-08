import axios from 'axios';
import { PoetText } from '../types';

const getPoetTexts = (poetTextId?: number): Promise<PoetText[]> => {
    let url = '/api/get-poet-texts';

    if (poetTextId !== undefined && !Number.isInteger(poetTextId)) {
        url = `/api/get-poet-texts/${poetTextId}`;
    }

    return axios
        .get<PoetText[]>(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching poet texts:', error);
            throw error;
        });
};

export default getPoetTexts;
