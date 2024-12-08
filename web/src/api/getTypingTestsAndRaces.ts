import axios from 'axios';
import { TypingTestOrRaceData } from '../types';

const getTypingTestsAndRaces = (
    userId: string,
    page: number,
    type: string,
    itemsPerPage: number
): Promise<TypingTestOrRaceData> => {
    const url = `/api/get-typing-tests-and-races?userId=${userId}&page=${page}&type=${type}&itemsPerPage=${itemsPerPage}`;

    return axios
        .get<TypingTestOrRaceData>(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching typing tests and races', error);
            throw error;
        });
};

export default getTypingTestsAndRaces;
