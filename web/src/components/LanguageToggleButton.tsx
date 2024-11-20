import { useLanguage } from '../context/LanguageContext';
import Button from './utils/Button';
import translate from '../utils/transalte';

const LanguageTogleButton = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'lv' ? 'en' : 'lv';
        setLanguage(newLanguage);
    };

    return (
        <Button onClick={toggleLanguage} className="primary-text text-xl">
            {translate('language', language)}
        </Button>
    );
};

export default LanguageTogleButton;
