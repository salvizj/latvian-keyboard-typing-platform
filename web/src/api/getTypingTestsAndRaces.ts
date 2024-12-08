import axios from 'axios';
import { TypingTestOrRaceData } from '../types';

const getTypingTestsAndRaces = async (
    userId: string,
    page: number,
    type: string,
    itemsPerPage: number
): Promise<TypingTestOrRaceData> => {
    try {
        const response = await axios.get<TypingTestOrRaceData>(
            `/api/get-typing-tests-and-races?userId=${userId}&page=${page}&type=${type}&itemsPerPage=${itemsPerPage}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching typing tests and races', error);
        throw error;
    }
};

export default getTypingTestsAndRaces;
