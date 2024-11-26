import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ClerkProvider } from '@clerk/clerk-react';
import { KeyboardSettingsProvider } from './context/KeyboardSettingsContext';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
}

const App = () => {
    return (
        <>
            <LanguageProvider>
                <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                    <ThemeProvider>
                        <KeyboardSettingsProvider>
                            <RouterProvider router={Router()} />
                        </KeyboardSettingsProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </LanguageProvider>
        </>
    );
};

export default App;
