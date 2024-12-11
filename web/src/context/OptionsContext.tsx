import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type OptionsContextType = {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    timeLeft: number | null;
    setTimeLeft: React.Dispatch<React.SetStateAction<number | null>>;
    lobbyId: string;
    setLobbyId: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    maxPlayerCount: number;
    setMaxPlayerCount: React.Dispatch<React.SetStateAction<number>>;
    lobbyMode: 'create' | 'join';
    setLobbyMode: React.Dispatch<React.SetStateAction<'create' | 'join'>>;
    isCustomText: boolean;
    setIsCustomText: React.Dispatch<React.SetStateAction<boolean>>;
    customText: string;
    setCustomText: React.Dispatch<React.SetStateAction<string>>;
    selectedText: string;
    setSelectedText: React.Dispatch<React.SetStateAction<string>>;
    textId: number | null;
    setTextId: React.Dispatch<React.SetStateAction<number | null>>;
    setTextType: React.Dispatch<React.SetStateAction<'custom' | 'poet'>>;
    textType: 'custom' | 'poet';
};

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

type OptionsProviderProps = {
    children: ReactNode;
};

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [timeLeft, setTimeLeft] = useState<number | null>(60);
    const [lobbyId, setLobbyId] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [maxPlayerCount, setMaxPlayerCount] = useState<number>(2);
    const [lobbyMode, setLobbyMode] = useState<'create' | 'join'>('create');
    const [isCustomText, setIsCustomText] = useState<boolean>(false);
    const [customText, setCustomText] = useState<string>('');
    const [selectedText, setSelectedText] = useState<string>('');
    const [textId, setTextId] = useState<number | null>(null);
    const [textType, setTextType] = useState<'custom' | 'poet'>('poet'); // Default to 'poet'
    const location = useLocation();
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevPathname) {
            setText('');
            setTime(60);
            setTimeLeft(60);
            setLobbyId('');
            setUsername('');
            setMaxPlayerCount(2);
            setLobbyMode('create');
            setIsCustomText(false);
            setCustomText('');
            setSelectedText('');
            setTextType('poet'); // Reset to default if required
            setPrevPathname(location.pathname);
        }
    }, [location.pathname, prevPathname]);

    return (
        <OptionsContext.Provider
            value={{
                text,
                setText,
                time,
                setTime,
                timeLeft,
                setTimeLeft,
                lobbyId,
                setLobbyId,
                username,
                setUsername,
                maxPlayerCount,
                setMaxPlayerCount,
                lobbyMode,
                setLobbyMode,
                isCustomText,
                setIsCustomText,
                customText,
                setCustomText,
                selectedText,
                setSelectedText,
                textId,
                setTextId,
                textType,
                setTextType,
            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};

export const useOptions = () => {
    const context = useContext(OptionsContext);

    if (context === undefined) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }

    return context;
};
