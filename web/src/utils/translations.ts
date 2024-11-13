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
	},
	lv: {
		login: "pieslēgties",
		home: "mājas",
		register: "reģistrēties",
		logout: "atslēgties",
		language: "LV",
		theme_dark: "tumšs",
		theme_light: "gaišs",
	},
}

export default translations
