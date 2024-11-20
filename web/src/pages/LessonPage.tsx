import { useGetLesson } from '../hooks/useGetLesson';
import Keyboard from '../components/keyboard/Keyboard';
import { useEffect, useState } from 'react';
import {
    isLessonComplete,
    markLessonComplete,
} from '../utils/lessonCompletion';

const LessonPage = () => {
    const { lesson, lessonError } = useGetLesson();
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (lesson) {
            const completedAlready = isLessonComplete(lesson.id);
            if (!completedAlready) markLessonComplete(lesson.id);
        }
    }, [finished, lesson]);

    if (lessonError) {
        return <div>{lessonError}</div>;
    }

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            {lesson?.lessonText && (
                <Keyboard
                    text={lesson.lessonText}
                    finished={finished}
                    setFinished={setFinished}
                />
            )}
        </div>
    );
};

export default LessonPage;
