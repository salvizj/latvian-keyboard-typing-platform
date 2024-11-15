import Button from "./utils/Button"
import { useTheme } from "../context/ThemeContext"
import { FaSun } from "react-icons/fa"
import { FaMoon } from "react-icons/fa6"
const ThemeTogleButton = () => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		const newTheme = theme === "" ? "dark" : ""
		setTheme(newTheme)
	}

	return (
		<Button onClick={toggleTheme} className="primary-text">
			<div className="w-16 h-8 flex items-center justify-between rounded-full border-2 border-secondary relative transition-all duration-300 ease-in-out">
				<FaMoon
					className={`absolute right-1 transition-all duration-300 ease-in-out ${
						theme === "dark"
							? "-translate-x-full opacity-0"
							: "translate-x-0 opacity-100"
					}`}
				/>

				<FaSun
					className={`absolute left-1 transition-all duration-300 ease-in-out ${
						theme === ""
							? "translate-x-full opacity-0"
							: "translate-x-0 opacity-100"
					}`}
				/>
			</div>
		</Button>
	)
}
export default ThemeTogleButton
