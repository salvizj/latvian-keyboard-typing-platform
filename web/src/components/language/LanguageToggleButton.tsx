import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

const LanguageToglebutton = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLanguage = language === 'lv' ? 'en' : 'lv';
        setLanguage(newLanguage);
    };

    return (
        <button onClick={toggleLanguage} className="primary-text text-xl hover:primary-hover-text">
            {translate('language', language)}
        </button>
    );
};

export default LanguageToglebutton;
