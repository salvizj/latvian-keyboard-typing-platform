import LanguageTogleButton from "../LanguageToggleButton"
import ThemeTogleButton from "../ThemeToggleButton"
import Navigation from "./Navigation"

const Dashboard = () => {
	return (
		<>
			<header>
				<Navigation />
				<LanguageTogleButton />
				<ThemeTogleButton />
			</header>
		</>
	)
}
export default Dashboard
