import axios from 'axios';
import { TypingTestOrRaceData } from '../types';

const getTypingTestsAndRaces = (
    userId: string,
    page: number,
    type: string,
    itemsPerPage: number
): Promise<TypingTestOrRaceData> => {
    return axios
        .get<TypingTestOrRaceData>('/api/get-typing-tests-and-races', {
            params: {
                userId,
                page,
                type,
                itemsPerPage,
            },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching typing tests and races', error);
            throw error;
        });
};

export default getTypingTestsAndRaces;
