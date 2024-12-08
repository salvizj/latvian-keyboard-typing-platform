import { useLanguage } from '../context/LanguageContext';
import LessonLinks from '../components/lesson/LesonLinks';
import translate from '../utils/translate';
import { LessonDifficulty, Lesson } from '../types';
import { useEffect, useState } from 'react';
import { useGetLessons } from '../hooks/useGetLessons';
import useGetLessonCompletion from '../hooks/useGetLessonCompletion';

const LessonsPage = () => {
    const { language } = useLanguage();
    const [selectedLessonDifficulty, setSelectedLessonDifficulty] = useState<string>('');
    const { lessons, lessonsError } = useGetLessons();
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);

    const lessonIds = filteredLessons.map((lesson) => lesson.lessonId).join(',');

    const { lessonGetError, lessonCompletion, lessonGetLoading } = useGetLessonCompletion(lessonIds);

    useEffect(() => {
        if (lessons) {
            if (!selectedLessonDifficulty) {
                setFilteredLessons(lessons);
            } else {
                const filtered = lessons.filter((lesson) => lesson.lessonDifficulty === selectedLessonDifficulty);
                setFilteredLessons(filtered);
            }
        }
    }, [lessons, selectedLessonDifficulty]);

    if (!Array.isArray(lessons) || lessons.length === 0) {
        return (
            <p className="text-xl text-color-secondary flex justify-center items-center h-full">
                {translate('error_lessons_not_available', language)}
            </p>
        );
    }

    if (lessonsError) {
        return (
            <p className="text-xl text-color-secondary flex justify-center items-center h-full">
                {translate(lessonsError, language)}
            </p>
        );
    }

    if (Array.isArray(lessons) && !Array.isArray(filteredLessons)) {
        return (
            <p className="text-xl text-color-secondary flex justify-center items-center h-full">
                {translate('error_no_lessons_found_with_this_difficulty', language)}
            </p>
        );
    }

    if (lessonGetError) {
        return (
            <p className="text-xl text-color-secondary flex justify-center items-center h-full">
                {translate(lessonGetError, language)}
            </p>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-6 ">
            <h1 className="text-4xl text-color-secondary mt-6">{translate('lessons', language)}</h1>
            <label htmlFor="lessonDifficulty" className="text-lg text-color-secondary">
                {translate('lesson_difficulty', language)}
            </label>
            <select
                className="w-full max-w-sm p-2 border text-color-third bg-color-primary"
                value={selectedLessonDifficulty}
                onChange={(e) => setSelectedLessonDifficulty(e.target.value)}
            >
                <option value="">{translate('all_difficulty', language)}</option>
                {Object.values(LessonDifficulty).map((difficulty: LessonDifficulty) => (
                    <option key={difficulty} value={difficulty}>
                        {translate(difficulty, language) + ' ' + translate('difficulty', language)}
                    </option>
                ))}
            </select>
            {lessonCompletion && !lessonGetLoading && (
                <LessonLinks lessons={filteredLessons} lessonCompletion={lessonCompletion} />
            )}
        </div>
    );
};

export default LessonsPage;
