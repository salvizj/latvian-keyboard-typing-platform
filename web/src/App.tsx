import Router from "./router/Router"
import { Auth0Provider } from "@auth0/auth0-react"
import { RouterProvider } from "react-router-dom"

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
				<RouterProvider router={Router()} />
			</Auth0Provider>
		</>
	)
}

export default App
