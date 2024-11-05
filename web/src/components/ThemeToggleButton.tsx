import { useEffect, useState } from "react"

const ThemeTogleButton = () => {
	const defaultTheme = "light"

	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || defaultTheme
	)

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light"
		setTheme(newTheme)
		localStorage.setItem("theme", newTheme)
		document.documentElement.className = newTheme
	}
	return (
		<button onClick={toggleTheme}>
			{theme === "light" ? "Light Mode" : "Dark Mode"}
		</button>
	)
}
export default ThemeTogleButton
