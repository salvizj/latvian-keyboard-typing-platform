import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KeyboardLayouts } from '../types';

const LOCAL_STORAGE_KEY_LAYOUT = 'keyboardLayout';
const LOCAL_STORAGE_KEY_SHOW_LAYOUT = 'showKeyboardLayout';
const LOCAL_STORAGE_KEY_SHOW_HANDS = 'showHands';

type KeyboardSettingsContextType = {
    keyboardLayout: KeyboardLayouts;
    setKeyboardLayout: (layout: KeyboardLayouts) => void;
    showKeyboardLayout: boolean;
    setShowKeyboardLayout: (value: boolean) => void;
    showHands: boolean;
    setShowHands: (value: boolean) => void;
};

const KeyboardSettingsContext = createContext<KeyboardSettingsContextType | undefined>(undefined);

export const KeyboardSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const defaultLayout: KeyboardLayouts = 'qwerty';
    const [keyboardLayout, setKeyboardLayout] = useState<KeyboardLayouts>(
        (localStorage.getItem(LOCAL_STORAGE_KEY_LAYOUT) as KeyboardLayouts) || defaultLayout
    );

    const [showKeyboardLayout, setShowKeyboardLayout] = useState<boolean>(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SHOW_LAYOUT) || 'true')
    );

    const [showHands, setShowHands] = useState<boolean>(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SHOW_HANDS) || 'true')
    );

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_LAYOUT, keyboardLayout);
    }, [keyboardLayout]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_SHOW_LAYOUT, JSON.stringify(showKeyboardLayout));
    }, [showKeyboardLayout]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_SHOW_HANDS, JSON.stringify(showHands));
    }, [showHands]);

    return (
        <KeyboardSettingsContext.Provider
            value={{
                keyboardLayout,
                setKeyboardLayout,
                showKeyboardLayout,
                setShowKeyboardLayout,
                showHands,
                setShowHands,
            }}
        >
            {children}
        </KeyboardSettingsContext.Provider>
    );
};

export const useKeyboardSettings = () => {
    const context = useContext(KeyboardSettingsContext);
    if (!context) {
        throw new Error('useKeyboardSettings must be used within a KeyboardSettingsProvider');
    }
    return context;
};
