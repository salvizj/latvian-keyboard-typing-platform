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
        history: 'history',
        appearance_settings: 'appearance settings',
        back_to_lessons: 'back to lessons',
        restart: 'restart',
        typing_race: 'typing race',
        you_have_completed: 'you have completed',
        out_of: 'out of',
        first_completed_lesson: 'first completed lesson:',
        most_recent_completed_lesson: 'most recent completed lesson:',
        start_test: 'start test',
        select_time: 'select time',
        seconds: 'seconds',
        select_text_option: 'select text option',
        pick_text: 'pick text',
        custom_text: 'costume text',
        choose_predefined_text: 'choose perefined text',
        enter_custom_text: 'enter custome text',
        mistakes: 'mistakes',
        wpm: 'words per minute',
        typing_test: 'typing test',
        typing_test_completed: 'typing test completed',
        create: 'create',
        join: 'join',
        enter_lobby_id: 'enter lobby identificator',
        start_typing_race: 'start typing race',
        go_to_type_racing_lobby: 'go to type racing lobby',
        join_lobby: 'join lobby',
        create_lobby: 'create lobby',
        select_max_player_count: 'select maximum player count',
        max_player_count: 'maximum player count',
        must_enter_costum_text: 'error: enter costum text',
        must_enter_lobby_id: 'error: enter lobby identificator',
        typing_race_lobby: 'typing race lobby',
        enter_username: 'enter username',
        must_enter_username: 'error: enter username',
        must_select_text: 'error: must select text',
        must_select_game: 'error: must select game',
        must_enter_custom_text: 'error: must enter custom text',
        custom_text_too_short: 'error: costum text is too  short, needs to be atleast 10 characters',
        inalid_time_small: 'error: invalid time, time can`t be under 10 seconds',
        inalid_time_large: 'error: invalid time, time can`t be over 120 seconds',
        invalid_player_count_large: 'error: invalid player count, maximum player count can`t be over 10',
        invalid_player_count_small: 'error: invalid player count, maximum player count can`t be under than 2',
        current_lobby_id: 'current lobby identificator',
        custom_text_too_long: 'error: custom text can`t be over 1000 characters',
        players: 'players',
        copied: 'copied',
        copy_to_clipboard: 'copy to clipboard',
        username: 'username',
        role: 'role',
        wait_for_owner_to_start_the_race: 'wait for lobby leader to start the race',
        leader: 'leader',
        player: 'player',
        mistake_count: 'mistake count',
        progress: 'progress',
        latvian_keyboard_typing_Platform: 'latvian keyboard typing platform',
        sign_out: 'log out',
        sign_up: 'sign up',
        sign_in: 'sign in',
        choose_preferable_keyboard_layout: 'choose preferable keyboard layout',
        show_keyboard_layout: 'show keyboard layout',
        show_hands: 'show hands',
        keyboard_settings: 'keyboard settings',
        keyboard_layout: 'keyboard layout',
        not_enough_players_to_start: 'not enough players to start, need atleast 2 players',
        start_game: 'start game',
        games: 'games',
        choose_game: 'choose game',
        hide_words: 'hide words',
        round: 'round',
        type_word_that_shows_above: 'type word that shows above',
        game_over_you_held_up: 'game over you held up',
        rounds: 'raounds',
        we_have_no_words_left: 'we don`t have any more words to give you congratulations',
        difficulty: 'difficulty',
        filter: 'filter',
        beginner: 'beginner',
        intermediate: 'intermediate',
        advanced: 'advanced',
        expert: 'expert',
        loading: 'loading',
        error_missing_fields: 'please fill in all the required fields',
        error_missing_password: 'password is required. Please enter a password',
        error_missing_email: 'email is required. Please enter a valid email address',
        error_invalid_email: 'the email address is invalid. Please enter a valid email',
        error_password_must_contain_number: 'password must contain at least one number',
        error_password_too_short: 'password is too short. It must be at least 6 characters',
        error_invalid_credentials: 'invalid login credentials. Please fill in correct credentials.',
        error_user_already_registered: 'user already registered',
        error_confirm_password_and_password_doesnt_match: 'the password and confirm password do not match',
        error_sign_out: 'sign out failed, Please try again',
        error_user_not_signed_In: 'you must be signed in to sign out. Please log in first',
        error_fetching_lesson_text: 'error loading the lesson. Please try again',
        error_fetching_poet_text: 'error loading poet texst. Please try again',
        error_lesson_id_not_provide: 'lesson Id was not provided. Please select a lesson',
        error_lesson_id_not_a_number: 'the lesson identificator is not a valid number. Please enter a correct Id',
        error_no_lessons_found_with_this_difficulty: 'no lessons found with this difficulty level.',
        error_no_lessons_found: 'no lessons found. Please try again.',
        password: 'password',
        email: 'email',
        confirm_password: 'confirm password',
        error_fetching_user: 'an error occurred. Failed to load profile data',
        user_id: 'user identificator',
        cancel: 'cancel',
        edit: 'edit',
        save_changes: 'save chanegs',
        error_layout_not_found: 'an error occurred. Failed to load keyboard layout',
        error_expected_character_key_obj_not_found: 'an error occurred. Failed to load expected key object',
        error_hand_finger_info_not_found: 'an error occurred. Failed to load hand finger info',
        error_updading_profile: 'couldn`t update profile. Please try again later',
        all_difficulty: 'all difficulty',
        lesson_difficulty: 'lessons difficulty',
        profile: 'profile',
        error_game_not_available: 'game available. Please try again later!',
        error_lessons_not_available: 'lessons unavailable. Please try again later!',
    },
    lv: {
        login: 'pieslēgties',
        home: 'mājas',
        register: 'reģistrēties',
        logout: 'atslēgties',
        language: 'LV',
        theme_dark: 'tumšs',
        theme_light: 'gaišs',
        keyboard_input_label: 'Raksties tekstu, kas atrodas augstāk',
        lessons: 'nodarbības',
        lesson: 'nodarbība',
        completed: 'pabeigta',
        history: 'vēsture',
        appearance_settings: 'izskata iestatījumi',
        back_to_lessons: 'atpakaļ pie nodarbībām',
        restart: 'atkārtot',
        start_typing_race: 'sākt rakstīšanas sacensības',
        typing_test: 'rakstīšanas tests',
        typing_test_completed: 'rakstīšanas tests pabeigts',
        typing_race: 'rakstīšanas sacensības',
        you_have_completed: 'jūs esat pabeidzis',
        out_of: 'no',
        first_completed_lesson: 'pirmā pabeigtā nodarbība:',
        most_recent_completed_lesson: 'pēdējā pabeigtā nodarbība:',
        start_test: 'sākt testu',
        select_time: 'izvēlities laiku',
        seconds: 'sekundes',
        select_text_option: 'izvelities teksta opciju',
        pick_text: 'izvēlities tekstu',
        custom_text: 'pielāgots teksts',
        choose_predefined_text: 'izvēlieties iepriekš definētu tekstu',
        enter_custom_text: 'ievadiet pielāgotu tekstu',
        mistakes: 'kļūdas',
        wpm: 'vārdu skaits minūtē',
        create: 'izveidot',
        join: 'pievienoties',
        enter_lobby_id: 'ievadiet istabas identifikatoru',
        go_to_type_racing_lobby: 'iet uz rakstīšanas sacensību istabu',
        join_lobby: 'pievienoties istabai',
        create_lobby: 'izveidot istabu',
        select_max_player_count: 'izvēlities maksimalo spēlētāju skaitu',
        max_player_count: 'maksimālais spēlētāju skaits',
        must_enter_costum_text: 'kļūda: ievadiet pielāgotu tekstu',
        must_enter_lobby_id: 'kļūda: ievadiet istabas Identificators',
        typing_race_lobby: 'rakstīšanas sacīkšu istaba',
        enter_username: 'ievadiet lietotājvārdu',
        must_enter_username: 'kļūda: ievadiet lietotājvārds',
        must_select_text: 'kļūda: jāizvēlas teksts',
        must_select_game: 'kļūda: jāizvēlas spēle',
        must_enter_custom_text: 'kļūda: jāievada pielāgots teksts',
        custom_text_too_short: 'kļūda: pielāgotais teksts ir pārāk īss, tam jābūt vismaz 10 rakstzīmēm',
        inalid_time_small: 'kļūda: nekorekts laiks, laiks nevar būt zem 10 sekundēm',
        inalid_time_large: 'kļūda: nekorekts laiks, laiks nevar būt lielāks par 120 sekundēm',
        invalid_player_count_large:
            'kļūda:  nekorekts spēlētāju daudzums, maskimālais spēlētāju daudzums nevar pārsniegt 10',
        invalid_player_count_small:
            'kļūda:  nekorekts spēlētāju daudzums, maksimālais spēlētāju dauduzms nevar būt mazāks par 2',
        current_lobby_id: 'pašreizējais istabas id',
        custom_text_too_long: 'kļūda: pielāgotais teksts ir pārāk garšs, tam jābūt ne vairāk par 1000 rakstīzmēm',
        players: 'spelētāji',
        copied: 'nokopēts',
        copy_to_clipboard: 'kopēt uz starpliktuvi',
        username: 'lietotājvārds',
        role: 'loma',
        wait_for_owner_to_start_the_race: 'gaidi, kad istabas līderis sāks sacensības',
        leader: 'līderis',
        player: 'spēlētājs',
        mistake_count: 'kļūdu skaits',
        progress: 'progress',
        latvian_keyboard_typing_Platform: 'latviešu klaviatūras rakstīšanas platforma',
        sign_out: 'izrakstīties',
        sign_up: 'reģistrēties',
        sign_in: 'pieslēgties',
        choose_preferable_keyboard_layout: 'izvēlieties vēlamo klaviatūras izkārtojumu',
        show_keyboard_layout: 'rādīt klaviatūras izkārtojumu',
        show_hands: 'rādīt rokas',
        keyboard_settings: 'klaviatūras iestatījumi',
        keyboard_layout: 'klaviatūras izkārtojums',
        not_enough_players_to_start: 'nav pietiekami daudz spēlētāji, lai sāktu, vajadzīgi vismaz 2 spelētaji',
        start_game: 'sākt spēli',
        games: 'spēles',
        choose_game: 'īzvēlieties spēli',
        hide_words: 'palēpt vārdus',
        round: 'raunds',
        type_word_that_shows_above: 'rakstiet vārdu, kas parādās augstāk',
        game_over_you_held_up: 'spele beigusies! Tu izturēji',
        rounds: 'raundus',
        we_have_no_words_left: 'mums vairs nav vārdu, ko tev iedot apsveicu',
        difficulty: 'ģrūtība',
        filter: 'filtrēt',
        beginner: 'iesācēja',
        intermediate: 'vidēja',
        advanced: 'izaicinoša',
        expert: 'eksperta',
        loading: 'lādējas',
        error_missing_fields: 'lūdzu aizpildiet visus obligātos laukus',
        error_missing_email: 'e-pasts ir obligāts. Lūdzu ievadiet e-pasta adresi',
        error_missing_password: 'parole ir obligāta. Lūdzu ievadiet paroli',
        errror_missing_confirm_password: 'apstiprinājuma parole ir obligāta. Lūdzu ievadiet apstiprinājuma paroli',
        error_invalid_email: 'e-pasta adrese ir nederīga. Lūdzu ievadiet derīgu e-pasta adresi',
        error_password_must_contain_number: 'Parolei jābūt vismaz vienam ciparam',
        error_password_too_short: 'parole ir pārāk īsa. Tai jābūt vismaz 6 rakstzīmēm',
        error_invalid_credentials: 'nederīgi pieslēgšanās dati. Lūdzu ievadiet korektus datus.',
        error_user_already_registered: 'lietotājs jau ir reģistrējies',
        error_confirm_password_and_password_doesnt_match: 'parole un apstiprinājuma parole nesakrīt',
        error_sign_out: 'izrakstīšanās neizdevās. Lūdzu mēģiniet vēlreiz',
        error_user_not_signed_In: 'vispirms jābūt pieslēgtam, lai varētu izrakstīties. Lūdzu, piesakieties vispirms',
        error_fetching_lesson_text: 'kļūda, ielādējot nodarbību. Lūdzu, mēģiniet vēlreiz',
        error_fetching_poet_text: 'kļūda, ielādējot dzejnieku tekstus. Lūdzu, mēģiniet vēlreiz',
        error_lesson_id_not_provide: 'nodarbības identifikators netika norādīts. Lūdzu, izvēlieties nodarbību',
        error_lesson_id_not_a_number: 'nodarbības identifikators nav derīgs skaitlis. Lūdzu, ievadiet pareizu Id',
        error_no_lessons_found_with_this_difficulty: 'nav atrastas nodarbības ar šo grūtības līmeni',
        error_no_lessons_found: 'nav atrasta neviena nodarība. Lūdzu mēģiniet atkārtoti ',
        password: 'parole',
        email: 'e-pasts',
        confirm_password: 'apstiprinājuma parole',
        error_fetching_user: 'radās kļūda. Neizdevās ielādēt profila datus',
        user_id: 'lietotaja identifikators',
        cancel: 'atcelt',
        edit: 'rediģēt',
        save_changes: 'saglabāt izmaiņas',
        error_layout_not_found: 'radās kļūda. Neizdevās ielādēt klaviatūras izkārtojumu',
        error_expected_character_key_obj_not_found: 'radās kļūda. Neizdevās ielādēt sagaidāmā taustiņa objektu',
        error_hand_finger_info_not_found: 'radās kļūda. Neizdevās ielādēt rokas pirkstu informāciju',
        error_updading_profile: 'neizdevās atjaunināt profila datus. Lūdzu mēģiniet vēlāk.',
        all_difficulty: 'visu grūtību',
        lesson_difficulty: 'nodarību grūtība',
        error_didint_find_key_obj: 'neizdevās atrast taustiņa objektu.',
        profile: 'profils',
        error_game_not_available: 'spele nav pieejama. Lūdzu mēģiniet vēlāk!',
        error_lessons_not_available: 'nodarības nav pieejamas. Lūdzu mēģiniet vēlāk!',
    },
};

export default translations;
