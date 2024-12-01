import { capitalize } from '../utils/capitalizeString';
import { useLanguage } from '../context/LanguageContext';
import LessonLinks from '../components/lesson/LesonLinks';
import translate from '../utils/translate';
import { LessonDifficulty, Lesson } from '../types';
import { useEffect, useState } from 'react';
import { useGetLessons } from '../hooks/useGetLessons';

const LessonsPage = () => {
    const { language } = useLanguage();
    const [selectedLessonDifficulty, setSelectedLessonDifficulty] = useState<string>('');
    const { lessons, lessonsError } = useGetLessons();
    const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);

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
            <p className="flex justify-center items-center text-center text-red-500 text-lg h-screen">
                {translate('error_no_lessons_found', language)}
            </p>
        );
    }

    if (lessonsError) {
        return (
            <p className="flex justify-center items-center text-center text-red-500 text-lg h-screen">
                {translate(lessonsError, language)}
            </p>
        );
    }

    if (Array.isArray(lessons) && !Array.isArray(filteredLessons)) {
        return (
            <p className="flex justify-center items-center text-center text-red-500 text-lg h-screen">
                {translate('error_no_lessons_found_with_this_difficulty', language)}
            </p>
        );
    }

    return (
        <div className="flex justify-center flex-col items-center min-h-screen gap-6">
            <h1 className="text-4xl text-color-secondary">{capitalize(translate('lessons', language))}</h1>
            <select
                className="w-1/12 p-4 border rounded-md text-color-third bg-color-primary"
                value={selectedLessonDifficulty}
                onChange={(e) => setSelectedLessonDifficulty(e.target.value)}
            >
                <option value="">{capitalize(translate('all', language))}</option>
                {Object.values(LessonDifficulty).map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                ))}
            </select>
            <LessonLinks lessons={filteredLessons} />
        </div>
    );
};

export default LessonsPage;
