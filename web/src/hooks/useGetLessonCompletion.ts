import { useState, useEffect } from 'react';
import getLessonCompletion from '../api/getLessonCompletion';
import useAuthStatus from './useAuthStatus';

const useGetLessonCompletion = (lessonIds: string) => {
    const [lessonCompletion, setLessonCompletion] = useState<{ [key: number]: boolean } | null>(null);
    const [lessonGetError, setLessonGetError] = useState<string | null>(null);
    const [lessonGetLoading, setLessonGetLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();

    useEffect(() => {
        if (userId && lessonIds.length > 0) {
            setLessonGetLoading(true);
            setLessonGetError(null);

            getLessonCompletion(userId, lessonIds)
                .then((data) => {
                    setLessonCompletion(data);
                    setLessonGetLoading(false);
                })
                .catch(() => {
                    setLessonGetError('Error fetching lesson completion status');
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
