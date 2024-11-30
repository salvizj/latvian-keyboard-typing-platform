import Router from './router/Router';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { KeyboardSettingsProvider } from './context/KeyboardSettingsContext';

const App = () => {
    return (
        <>
            <LanguageProvider>
                <ThemeProvider>
                    <KeyboardSettingsProvider>
                        <RouterProvider router={Router()} />
                    </KeyboardSettingsProvider>
                </ThemeProvider>
            </LanguageProvider>
        </>
    );
};

export default App;
