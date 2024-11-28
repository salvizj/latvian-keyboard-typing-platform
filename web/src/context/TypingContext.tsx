import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type TypingContextType = {
    wpm: number;
    setWpm: React.Dispatch<React.SetStateAction<number>>;
    mistakeCount: number;
    setMistakeCount: React.Dispatch<React.SetStateAction<number>>;
    procentsOfTextTyped: number;
    setProcentsOfTextTyped: React.Dispatch<React.SetStateAction<number>>;
    isTypingFinished: boolean;
    setIsTypingFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

const TypingContext = createContext<TypingContextType | undefined>(undefined);

type TypingProviderProps = {
    children: ReactNode;
};

export const TypingProvider: React.FC<TypingProviderProps> = ({ children }) => {
    const [wpm, setWpm] = useState(0);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [procentsOfTextTyped, setProcentsOfTextTyped] = useState(0);
    const [isTypingFinished, setIsTypingFinished] = useState(false);
    const location = useLocation();
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    useEffect(() => {
        setWpm(0);
        setMistakeCount(0);
        setProcentsOfTextTyped(0);
        setIsTypingFinished(false);

        setPrevPathname(location.pathname);
    }, [location.pathname, prevPathname]);

    return (
        <TypingContext.Provider
            value={{
                wpm,
                setWpm,
                mistakeCount,
                setMistakeCount,
                procentsOfTextTyped,
                setProcentsOfTextTyped,
                isTypingFinished,
                setIsTypingFinished,
            }}
        >
            {children}
        </TypingContext.Provider>
    );
};

export const useTyping = () => {
    const context = useContext(TypingContext);

    if (context === undefined) {
        throw new Error('useTyping must be used within a TypingProvider');
    }

    return context;
};

export default TypingContext;
