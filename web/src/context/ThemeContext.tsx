import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react"

type Theme = "" | "dark"

const LOCAL_STORAGE_KEY = "theme"

type ThemeContextType = {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)
		return (savedTheme as Theme) || ""
	})

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("dark")
		}

		localStorage.setItem(LOCAL_STORAGE_KEY, theme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
