import { useEffect, useState } from "react"

const LanguageTogleButton = () => {
	const defaultLanguage = "lv"

	const [language, setLanguage] = useState(
		localStorage.getItem("language") || defaultLanguage
	)

	useEffect(() => {
		document.documentElement.lang = language
	}, [language])

	const toggleLanguage = () => {
		const newLanguage = language === "lv" ? "en" : "lv"
		setLanguage(newLanguage)
		localStorage.setItem("language", newLanguage)
		document.documentElement.lang = newLanguage
	}

	return (
		<button onClick={toggleLanguage}>
			{language === "lv" ? "Latviešu" : "English"}
		</button>
	)
}
export default LanguageTogleButton
