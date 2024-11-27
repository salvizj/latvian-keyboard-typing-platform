import { useGetLesson } from '../hooks/useGetLesson';
import Keyboard from '../components/keyboard/Keyboard';

const LessonPage = () => {
    const { lesson, lessonError } = useGetLesson();

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            {lesson?.lessonText && !lessonError && <Keyboard lessonId={lesson.id} />}
        </div>
    );
};

export default LessonPage;
