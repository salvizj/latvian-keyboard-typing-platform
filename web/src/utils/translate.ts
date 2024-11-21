import translations from './translations';

const useTranslate = (key: string, language: string) => {
    return translations[language][key] || key;
};

export default useTranslate;
