import LanguageTogleButton from "../LanguageToggleButton"
import LoginButton from "../LoginButton"
import ThemeTogleButton from "../ThemeToggleButton"
import Navigation from "./Navigation"

const Dashboard = () => {
	return (
		<div>
			<div className="flex justify-center sticky gap-4 pt-10">
				<LanguageTogleButton />
				<ThemeTogleButton />
			</div>
			<div className="flex flex-col">
				<LoginButton />
				<Navigation />
			</div>
		</div>
	)
}

export default Dashboard
