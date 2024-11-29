import axios from 'axios';
import { Lesson } from '../types';

const getLessons = async (): Promise<Lesson[]> => {
    try {
        const response = await axios.get<Lesson[]>(`/api/lessons`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }
};

export default getLessons;
