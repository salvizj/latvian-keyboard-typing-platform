import { useLanguage } from '../../context/LanguageContext.tsx';
import { capitalize } from '../../utils/capitalizeString.ts';
import { LessonCompletionData } from '../../types.ts';
import translate from '../../utils/translate.ts';
import { getAllLessonCompletions } from '../../utils/lessonCompletion.ts';

const StatisticsLessons = () => {
    const { language } = useLanguage();

    const storedData: LessonCompletionData = getAllLessonCompletions();

    const completedLessons = Object.entries(storedData)
        .filter(([, lessonData]) => lessonData.completed)
        .map(([, lessonData]) => lessonData);

    const totalLessons = 54;
    const completedCount = completedLessons.length;

    const completedMessage = `${capitalize(translate('you_have_completed', language))} ${completedCount} ${translate('out_of', language)} ${totalLessons} ${translate('lessons', language)}`;

    return (
        <div className="flex justify-center items-center">
            <h2>{translate('lessons_completion_statistics', language)}</h2>
            <p>{completedMessage}</p>
        </div>
    );
};

export default StatisticsLessons;
