import { useLanguage } from "../context/LanguageContext"
import Button from "./utils/Button"
import translate from "../utils/translate"

const LanguageTogleButton = () => {
	const { language, setLanguage } = useLanguage()

	const toggleLanguage = () => {
		const newLanguage = language === "lv" ? "en" : "lv"
		setLanguage(newLanguage)
	}

	return <Button onClick={toggleLanguage}>{translate("language")}</Button>
}

export default LanguageTogleButton
