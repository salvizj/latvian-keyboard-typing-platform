import axios from 'axios';
import { PoetText } from '../types';

const getPoetTexts = async (): Promise<PoetText[]> => {
    try {
        const response = await axios.get<PoetText[]>(`/api/poet-texts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching poet texts:', error);
        throw error;
    }
};

export default getPoetTexts;
