import Router from "./router/Router"
import { Auth0Provider } from "@auth0/auth0-react"
import { RouterProvider } from "react-router-dom"
import "./global.css"
import { LanguageProvider } from "./context/LanguageContext"
import { ThemeProvider } from "./context/ThemeContext"

const App = () => {
	return (
		<>
			<Auth0Provider
				domain="latvian-typing-tutor.eu.auth0.com"
				clientId="zKpnXNSPOKHwYZyWZ43uTaGdkBKWWqhT"
				authorizationParams={{
					redirect_uri: window.location.origin,
				}}
			>
				<LanguageProvider>
					<ThemeProvider>
						<RouterProvider router={Router()} />
					</ThemeProvider>
				</LanguageProvider>
			</Auth0Provider>
		</>
	)
}

export default App
