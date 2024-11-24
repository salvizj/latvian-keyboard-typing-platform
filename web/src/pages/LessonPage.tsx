import { useGetLesson } from '../hooks/useGetLesson';
import Keyboard from '../components/keyboard/Keyboard';
import { useState } from 'react';

const LessonPage = () => {
    const { lesson, lessonError } = useGetLesson();
    const [wpm, setWpm] = useState(0);
    const [mistakeCount, setMistakeCount] = useState(0);

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            {lesson?.lessonText && !lessonError && (
                <Keyboard
                    text={lesson.lessonText}
                    lessonMode={true}
                    lessonId={lesson.id}
                    wpm={wpm}
                    setWpm={setWpm}
                    mistakeCount={mistakeCount}
                    setMistakeCount={setMistakeCount}
                />
            )}
        </div>
    );
};

export default LessonPage;
