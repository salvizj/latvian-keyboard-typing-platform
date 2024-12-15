import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

const LanguageToglebutton = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'lv' ? 'en' : 'lv';
        setLanguage(newLanguage);
    };

    return (
        <button onClick={toggleLanguage} className="text-color-primary text-xl hover:text-color-primary-hover-text">
            {translate('language', language)}
        </button>
    );
};

export default LanguageToglebutton;
