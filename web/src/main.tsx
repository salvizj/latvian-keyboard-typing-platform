import { StrictMode } from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import { createRoot } from "react-dom/client"
import App from "./App"

const root = document.getElementById("root")

if (root) {
	createRoot(root).render(
		<StrictMode>
			<Auth0Provider
				domain="latvian-typing-tutor.eu.auth0.com"
				clientId="zKpnXNSPOKHwYZyWZ43uTaGdkBKWWqhT"
				authorizationParams={{
					redirect_uri: window.location.origin,
				}}
			>
				<App />
			</Auth0Provider>
		</StrictMode>
	)
}
