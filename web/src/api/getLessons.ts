import axios from 'axios';
import { Lesson } from '../types';

const getLessons = (): Promise<Lesson[]> => {
    return axios
        .get<Lesson[]>(`/api/get-lessons`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching lessons:', error);
            throw error;
        });
};

export default getLessons;
