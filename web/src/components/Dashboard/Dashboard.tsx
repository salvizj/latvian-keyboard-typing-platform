import LanguageTogleButton from "../LanguageToggleButton"
import LoginButton from "../LoginButton"
import ThemeTogleButton from "../ThemeToggleButton"
import Navigation from "./Navigation"

const Dashboard = () => {
	return (
		<>
			<LoginButton />
			<Navigation />
			<LanguageTogleButton />
			<ThemeTogleButton />
		</>
	)
}
export default Dashboard
