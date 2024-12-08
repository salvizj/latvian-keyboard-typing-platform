import axios from 'axios';

const postLessonCompletion = (userId: string, lessonId: number): Promise<{ success: boolean }> => {
    return axios
        .post('/api/post-lesson-completion', {
            userId: userId,
            lessonId: lessonId,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error posting lesson completion:', error);
            throw new Error('Unable to post lesson completion.');
        });
};

export default postLessonCompletion;
