type Translations = {
	[language: string]: {
		[key: string]: string
	}
}

const translations: Translations = {
	en: {
		language: "EN",
		home: "home",
		login: "login",
		register: "register",
		logout: "logout",
		theme_dark: "dark",
		theme_light: "light",
		keyboard_input_label: "Type the text above",
		lessons: "lessons",
		statistics: "statistics",
		appearance_settings: "appearance settings",
	},
	lv: {
		login: "pieslēgties",
		home: "mājas",
		register: "reģistrēties",
		logout: "atslēgties",
		language: "LV",
		theme_dark: "tumšs",
		theme_light: "gaišs",
		keyboard_input_label: "Raksties tekstu, kas atrodas augstāk ",
		lessons: "nodarbības",
		statistics: "statistika",
		appearance_settings: "izskata iestatījumi",
	},
}

export default translations
