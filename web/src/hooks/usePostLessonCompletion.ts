import { useState, useEffect } from 'react';
import postLessonCompletion from '../api/postLessonCompletion';
import { useParams } from 'react-router-dom';
import { useTyping } from '../context/TypingContext';
import useAuthStatus from './useAuthStatus';

const usePostLessonCompletion = () => {
    const [lessonPostError, setLessonPostError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [lessonPostLoading, setLessonPostLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();
    const { lessonId } = useParams<{ lessonId: string }>();
    const { isTypingFinished } = useTyping();

    useEffect(() => {
        if (userId && lessonId != null && isTypingFinished) {
            setLessonPostError(null);
            setSuccess(null);
            setLessonPostLoading(true);

            postLessonCompletion(userId, parseInt(lessonId, 10))
                .then((response) => {
                    if (response.success) {
                        setSuccess(true);
                    }
                    setLessonPostLoading(false);
                })
                .catch(() => {
                    setLessonPostError('Error posting lesson completion');
                    setLessonPostLoading(false);
                });
        }
    }, [userId, lessonId, isTypingFinished]);

    return {
        lessonPostError,
        success,
        lessonPostLoading,
    };
};

export default usePostLessonCompletion;
