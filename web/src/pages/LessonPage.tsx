import { useGetLesson } from '../hooks/useGetLesson';
import Keyboard from '../components/keyboard/Keyboard';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';

const LessonPage = () => {
    const { language } = useLanguage();
    const { lesson, lessonError } = useGetLesson();

    if (lessonError || !lesson) {
        const errorMessage = lessonError ? translate(lessonError, language) : 'An unexpected error occurred.';
        return <p>{errorMessage}</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <Keyboard lessonId={lesson.lessonId} />
        </div>
    );
};

export default LessonPage;
