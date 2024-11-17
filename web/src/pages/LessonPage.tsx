import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lesson } from '../types';
import getLesson from '../api/getLesson';
import Keyboard from '../components/keyboard/Keyboard';

const LessonPage = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getLesson(Number(id))
                .then((data) => {
                    setLesson(data);
                })
                .catch(() => {
                    setError('Error fetching lesson');
                });
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <Keyboard text={lesson.lessonText} />
        </div>
    );
};

export default LessonPage;
