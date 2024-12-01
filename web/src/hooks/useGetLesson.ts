import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getLesson from '../api/getLesson';
import { Lesson } from '../types';

export const useGetLesson = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [lessonError, setLessonError] = useState<string | null>(null);

    useEffect(() => {
        // check if the lessonId is a vallessonId number
        if (lessonId === undefined || lessonId === null) {
            // if lessonId is not provided at all
            setLessonError('error_lesson_lessonId_not_provIded');
        } else if (isNaN(Number(lessonId))) {
            // if lessonId is provided but it's not a valid number
            setLessonError('error_lesson_lessonId_not_a_number');
        } else {
            // if lessonId is valid, fetch the lesson
            getLesson(Number(lessonId))
                .then((data) => {
                    setLesson(data);
                })
                .catch(() => {
                    setLessonError('error_fetching_lesson_text');
                });
        }
    }, [lessonId]);
    return { lesson, lessonError };
};
