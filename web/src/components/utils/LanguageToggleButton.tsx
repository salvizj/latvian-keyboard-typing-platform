import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import Button from './Button';

const LanguageTogleButton = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'lv' ? 'en' : 'lv';
        setLanguage(newLanguage);
    };

    return (
        <Button onClick={toggleLanguage} className="primary-text text-xl hover:primary-hover-text">
            {translate('language', language)}
        </Button>
    );
};

export default LanguageTogleButton;
