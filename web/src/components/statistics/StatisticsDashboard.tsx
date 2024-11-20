import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/transalte';
import { capitalize } from '../../utils/capitalize';

const StatisticsDashboard = () => {
    const { language } = useLanguage();

    return (
        <div className="flex gap-4 pt-10 justify-center">
            <Link
                to="/statistics/lessons"
                className="flex items-center justify-center p-4 third-bg primary-text rounded-lg min-w-[16rem] hover:third-hover"
            >
                {capitalize(translate('lessons', language))}
            </Link>
            <Link
                to="/statistics/typing-test"
                className="flex items-center justify-center p-4 third-bg primary-text rounded-lg min-w-[16rem] hover:third-hover"
            >
                {capitalize(translate('typing_test', language))}
            </Link>
            <Link
                to="/statistics/typing-race"
                className="flex items-center justify-center p-4 third-bg primary-text rounded-lg min-w-[16rem] hover:third-hover"
            >
                {capitalize(translate('typing_race', language))}
            </Link>
        </div>
    );
};

export default StatisticsDashboard;
