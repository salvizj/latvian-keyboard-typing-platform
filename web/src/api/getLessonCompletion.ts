import axios from 'axios';

type LessonCompletionResponse = { [key: number]: boolean };

const getLessonCompletion = (userId: string, lessonIds: string): Promise<LessonCompletionResponse> => {
    return axios
        .get('/api/get-lesson-completion', {
            params: {
                userId: userId,
                lessonIds: lessonIds,
            },
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Error fetching lesson completion:', error);
            throw new Error('Unable to fetch lesson completion data.');
        });
};

export default getLessonCompletion;
