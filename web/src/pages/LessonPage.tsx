import { useGetLesson } from '../hooks/useGetLesson';
import Keyboard from '../components/keyboard/Keyboard';

const LessonPage = () => {
    const { lesson, lessonError } = useGetLesson();

    if (lessonError) {
        return <div>{lessonError}</div>;
    }

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            {lesson?.lessonText && <Keyboard text={lesson.lessonText} />}
        </div>
    );
};

export default LessonPage;
