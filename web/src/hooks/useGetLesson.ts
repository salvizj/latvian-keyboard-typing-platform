import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getLesson from '../api/getLesson';
import { Lesson } from '../types';

export const useGetLesson = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [lessonError, setLessonError] = useState<string | null>(null);

    useEffect(() => {
        if (!lessonId) {
            setLessonError('error_lesson_lessonId_not_provided');
            return;
        }

        const lessonIdNumber = Number(lessonId);

        if (isNaN(lessonIdNumber)) {
            setLessonError('error_lesson_lessonId_not_a_number');
            return;
        }

        getLesson(lessonIdNumber)
            .then((data) => {
                setLesson(data);
                setLessonError(null);
            })
            .catch((error) => {
                console.error('Error fetching lesson:', error);
                setLessonError('error_fetching_lesson_text');
                setLesson(null);
            });
    }, [lessonId]);

    return { lesson, lessonError };
};
