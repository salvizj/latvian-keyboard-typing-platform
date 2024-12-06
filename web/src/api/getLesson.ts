import axios from 'axios';
import { Lesson } from '../types';

const getLesson = async (lessonId: number): Promise<Lesson> => {
    try {
        const response = await axios.get<Lesson>(`/api/get-lesson/${lessonId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lesson:', error);
        throw error;
    }
};

export default getLesson;
