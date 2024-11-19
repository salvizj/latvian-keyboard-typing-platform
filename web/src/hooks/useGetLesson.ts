import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getLesson from '../api/getLesson';
import { Lesson } from '../types';

export const useGetLesson = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [lessonError, setLessonError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getLesson(Number(id))
                .then((data) => {
                    setLesson(data);
                })
                .catch(() => {
                    setLessonError('Error fetching lesson text');
                });
        }
    }, [id]);
    return { lesson, lessonError };
};
