import { useEffect, useState } from 'react';
import { Lesson } from '../types';
import getLessons from '../api/getLessons';

const useGetLessons = () => {
    const [lessons, setLessons] = useState<Lesson[] | null>(null);
    const [lessonsError, setLessonError] = useState<string | null>(null);

    useEffect(() => {
        getLessons()
            .then((data) => {
                setLessons(data);
            })
            .catch(() => {
                setLessonError('Error fetching lessons');
            });
    }, []);

    return { lessons, lessonsError };
};
export default useGetLessons;
