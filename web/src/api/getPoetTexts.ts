import axios from 'axios';
import { PoetText } from '../types';

const getPoetTexts = async (poetTextId?: number): Promise<PoetText[]> => {
    try {
        let url = '/api/get-poet-texts';

        if (poetTextId !== undefined && !Number.isInteger(poetTextId)) {
            url = `/api/get-poet-texts/${poetTextId}`;
        }

        const response = await axios.get<PoetText[]>(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching poet texts:', error);
        throw error;
    }
};

export default getPoetTexts;
