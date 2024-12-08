import axios from 'axios';
import { Lesson } from '../types';

const getLesson = (lessonId: number): Promise<Lesson> => {
    return axios
        .get<Lesson>(`/api/get-lesson`, {
            params: { lessonId },
        })

        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching lesson:', error);
            throw error;
        });
};

export default getLesson;
