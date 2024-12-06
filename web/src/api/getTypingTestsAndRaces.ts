import axios from 'axios';
import { TypingTestOrRaceData } from '../types';

const getTypingTestsAndRaces = async (userId: string, count: number, type: string): Promise<TypingTestOrRaceData> => {
    try {
        const response = await axios.get<TypingTestOrRaceData>(
            `/api/get-typing-tests-and-races?userId=${userId}&count=${count}&type=${type}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching typing tests and races', error);
        throw error;
    }
};

export default getTypingTestsAndRaces;
