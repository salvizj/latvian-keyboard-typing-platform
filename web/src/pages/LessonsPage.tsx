import { capitalize } from '../utils/capitalize';
import { useLanguage } from '../context/LanguageContext';
import LessonLinks from '../components/Lesson/LesonLinks';
import translate from '../utils/transalte';

const LessonsPage = () => {
    const { language } = useLanguage();
    const translatedLessons = translate('lessons', language);

    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen gap-6">
                <h1 className="text-4xl secondary-text">
                    {capitalize(translatedLessons)}
                </h1>
                <LessonLinks />
            </div>
        </>
    );
};

export default LessonsPage;
