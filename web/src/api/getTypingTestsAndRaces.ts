import axios from 'axios';
import { TypingTestOrRaceData } from '../types';

const getTypingTestsAndRaces = (
    userId: string,
    page: number,
    type: string,
    itemsPerPage: number,
    dateFrom?: string,
    dateTill?: string
): Promise<TypingTestOrRaceData> => {
    let url =
        '/api/get-typing-tests-and-races?userId=' +
        userId +
        '&page=' +
        page +
        '&type=' +
        type +
        '&itemsPerPage=' +
        itemsPerPage;

    if (dateFrom) {
        url += '&dateFrom=' + encodeURIComponent(dateFrom);
    }
    if (dateTill) {
        url += '&dateTill=' + encodeURIComponent(dateTill);
    }

    return axios
        .get<TypingTestOrRaceData>(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching typing tests and races', error);
            throw error;
        });
};

export default getTypingTestsAndRaces;
