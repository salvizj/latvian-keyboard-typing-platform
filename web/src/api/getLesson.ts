import axios from 'axios';
import { Lesson } from '../types';

const getLesson = async (id: number): Promise<Lesson> => {
    try {
        const response = await axios.get<Lesson>(`/api/lessons/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        throw error;
    }
};

export default getLesson;
