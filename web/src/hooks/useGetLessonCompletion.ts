import { useState, useEffect } from 'react';
import getLessonCompletion from '../api/getLessonCompletion';
import useAuthStatus from './useAuthStatus';

const useGetLessonCompletion = (lessonIds: string) => {
    const [lessonCompletion, setLessonCompletion] = useState<{ [key: number]: boolean } | null>(null);
    const [lessonGetError, setLessonGetError] = useState<string | null>(null);
    const [lessonGetLoading, setLessonGetLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();

    useEffect(() => {
        if (!userId) {
            setLessonGetLoading(false);
            setLessonCompletion(null);
        }

        if (userId && lessonIds.length > 0) {
            setLessonGetLoading(true);
            setLessonGetError(null);

            getLessonCompletion(userId, lessonIds)
                .then((data) => {
                    setLessonCompletion(data);
                    setLessonGetLoading(false);
                })
                .catch(() => {
                    setLessonGetError('error_fetching_lessons_completion');
                    setLessonGetLoading(false);
                });
        }
    }, [userId, lessonIds]);

    return {
        lessonCompletion,
        lessonGetError,
        lessonGetLoading,
    };
};
export default useGetLessonCompletion;
