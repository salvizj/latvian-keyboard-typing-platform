import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';

const HistoryDashboard = () => {
    const { language } = useLanguage();

    return (
        <div className="flex gap-4 pt-10 justify-center">
            <Link
                to="/history/typing-test"
                className="flex items-center justify-center p-4 bg-color-third text-color-primary rounded-lg min-w-[16rem] hover:text-color-third-hover-text"
            >
                {capitalize(translate('typing_test', language))}
            </Link>
            <Link
                to="/history/typing-race"
                className="flex items-center justify-center p-4 bg-color-third text-color-primary rounded-lg min-w-[16rem] hover:text-color-third-hover-text"
            >
                {capitalize(translate('typing_race', language))}
            </Link>
        </div>
    );
};

export default HistoryDashboard;
