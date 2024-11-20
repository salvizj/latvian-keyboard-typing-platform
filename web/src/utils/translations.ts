type Translations = {
    [language: string]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        language: 'EN',
        home: 'home',
        login: 'login',
        register: 'register',
        logout: 'logout',
        theme_dark: 'dark',
        theme_light: 'light',
        keyboard_input_label: 'Type the text above',
        lessons: 'lessons',
        lesson: 'lesson',
        completed: 'completed',
        statistics: 'statistics',
        appearance_settings: 'appearance settings',
        back_to_lessons: 'back to lessons',
        restart: 'restart',
        typing_test: 'typing test',
        typing_race: 'typing race',
    },
    lv: {
        login: 'pieslēgties',
        home: 'mājas',
        register: 'reģistrēties',
        logout: 'atslēgties',
        language: 'LV',
        theme_dark: 'tumšs',
        theme_light: 'gaišs',
        keyboard_input_label: 'Raksties tekstu, kas atrodas augstāk ',
        lessons: 'nodarbības',
        lesson: 'nodarbība',
        completed: 'pabeigta',
        statistics: 'statistika',
        appearance_settings: 'izskata iestatījumi',
        back_to_lessons: 'atpakaļ pie nodarbībām',
        restart: 'atkārtot',
        typing_test: 'rakstīšanas tests',
        typing_race: 'rakstīšanas sacensības',
    },
};

export default translations;
