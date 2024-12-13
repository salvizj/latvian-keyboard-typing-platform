import Keyboard from '../components/keyboard/Keyboard';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';
import { useTyping } from '../context/TypingContext';
import usePostLessonCompletion from '../hooks/usePostLessonCompletion';
import { useEffect } from 'react';
import { useOptions } from '../context/OptionsContext';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useNavigate, useParams } from 'react-router-dom';
import useGetLesson from '../hooks/useGetLesson';

const LessonPage = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const { language } = useLanguage();
    const { isTypingFinished } = useTyping();
    const { lessonGetError, lesson, lessonGetLoading } = useGetLesson();
    const { lessonPostError, lessonPostLoading } = usePostLessonCompletion();
    const { setText, text } = useOptions();
    const navigate = useNavigate();

    useEffect(() => {
        if (lesson) {
            setText(lesson.lessonText);
        }
    }, [lesson, lessonGetError, lessonGetLoading, setText]);

    if (lessonPostError && !lessonPostLoading) {
        return (
            <p className="flex justify-center items-start min-h-screen text-color-primary text-xl">
                {' '}
                {translate(lessonPostError, language)}
            </p>
        );
    }

    if (lessonGetError && !lessonGetLoading) {
        return (
            <p className="flex justify-center items-start min-h-screen text-color-primary text-xl">
                {translate('error_fetching_lesson_text', language)}
            </p>
        );
    }

    if (!lesson && !lessonGetLoading) {
        return (
            <p className="flex justify-center items-start min-h-screen text-color-primary text-xl">
                {' '}
                {translate('error_fetching_lesson_text', language)}
            </p>
        );
    }
    if (isTypingFinished && lessonId) {
        return (
            <CompletionScreen
                title={'lesson_completed'}
                buttons={[
                    {
                        text: 'home',
                        onClick: () => navigate('/'),
                    },
                    {
                        text: 'restart',
                        onClick: () => window.location.reload(),
                    },
                    {
                        text: 'next_lesson',
                        onClick: () => navigate(`/lesson/${parseInt(lessonId) + 1}`),
                    },
                ]}
                showMetrics={false}
            />
        );
    }

    return (
        <>
            {text && !isTypingFinished && (
                <div className="flex flex-col justify-center items-center w-full min-h-screen">
                    <Keyboard />
                </div>
            )}
        </>
    );
};

export default LessonPage;
