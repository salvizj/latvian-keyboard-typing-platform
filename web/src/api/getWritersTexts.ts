import axios from 'axios';
import { WritersText } from '../types';

const getWritersTexts = (writersTextId?: number): Promise<WritersText[]> => {
    let url = '/api/get-writers-texts';

    if (writersTextId !== undefined && !Number.isInteger(writersTextId)) {
        url = `/api/get-writers-texts/${writersTextId}`;
    }

    return axios
        .get<WritersText[]>(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching writers texts:', error);
            throw error;
        });
};

export default getWritersTexts;
