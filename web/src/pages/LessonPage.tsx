import Keyboard from '../components/keyboard/Keyboard';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';
import { useTyping } from '../context/TypingContext';
import usePostLessonCompletion from '../hooks/usePostLessonCompletion';
import { useEffect, useState } from 'react';
import { useOptions } from '../context/OptionsContext';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetLesson from '../hooks/useGetLesson';

const LessonPage = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const { language } = useLanguage();
    const { isTypingFinished } = useTyping();
    const location = useLocation();
    const [fetch, setFetch] = useState(false);
    const lessonFromState = location.state?.lesson;
    const lessonsCount = 100;

    useEffect(() => {
        if (!lessonFromState && !fetch) {
            setFetch(true);
        }
    }, [lessonFromState, fetch]);

    const { lessonGetError, lesson, lessonGetLoading } = useGetLesson(fetch);
    const { lessonPostError, lessonPostLoading } = usePostLessonCompletion();
    const { setText, text } = useOptions();
    const navigate = useNavigate();

    useEffect(() => {
        if (lessonFromState) {
            setText(lessonFromState.lessonText);
        }
        if (lesson) {
            setText(lesson?.lessonText);
        }
    }, [lesson, lessonFromState, lessonGetError, lessonGetLoading, setText]);

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

    if (!lessonFromState && !lesson && !lessonGetLoading) {
        return (
            <p className="flex justify-center items-start min-h-screen text-color-primary text-xl">
                {' '}
                {translate('error_fetching_lesson_text', language)}
            </p>
        );
    }
    if (isTypingFinished && lessonId && parseInt(lessonId, 10) + 1 <= lessonsCount) {
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
                        onClick: () => {
                            const nextLessonId = parseInt(lessonId, 10) + 1;
                            navigate(`/lesson/${nextLessonId}`);
                        },
                    },
                ]}
                showMetrics={false}
            />
        );
    } else if (isTypingFinished && lessonId) {
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
