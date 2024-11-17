import translations from './translations';
import { useLanguage } from '../context/LanguageContext';

const translate = (key: string) => {
    const { language } = useLanguage();
    return translations[language][key] || key;
};

export default translate;
