import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getLesson from '../api/getLesson';
import { Lesson } from '../types';

const useGetLesson = (fetch: boolean) => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [lessonGetError, setLessonGetError] = useState<string | null>(null);
    const [lessonGetLoading, setLessonGetLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!lessonId) {
            setLessonGetError('error_lesson_lessonId_not_provided');
            return;
        }
        if (!fetch) {
            return;
        }

        const lessonIdNumber = Number(lessonId);

        if (isNaN(lessonIdNumber)) {
            setLessonGetError('error_lesson_lessonId_not_a_number');
            return;
        }

        setLessonGetLoading(true);

        getLesson(lessonIdNumber)
            .then((data) => {
                setLesson(data);
                setLessonGetError(null);
            })
            .catch((error) => {
                console.error('Error fetching lesson:', error);
                setLessonGetError('error_fetching_lesson_text');
                setLesson(null);
            })
            .finally(() => {
                setLessonGetLoading(false);
            });
    }, [fetch, lessonId]);

    return { lesson, lessonGetError, lessonGetLoading };
};
export default useGetLesson;
