import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'lv';

const LOCAL_STORAGE_KEY = 'language';

type LanguageContextType = {
    language: string;
    setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const defaultLanguage: Language = 'lv';

    const [language, setLanguage] = useState<string>(localStorage.getItem(LOCAL_STORAGE_KEY) || defaultLanguage);

    useEffect(() => {
        document.documentElement.lang = language;
        localStorage.setItem(LOCAL_STORAGE_KEY, language);
    }, [language]);

    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
