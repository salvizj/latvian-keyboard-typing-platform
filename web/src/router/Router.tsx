import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom"
import IndexPage from "../pages/IndexPage"
import Layout from "../pages/Layout/Layout"
import LessonsPage from "../pages/LessonsPage"
import StatisticsPage from "../pages/Statistics"
import AppearanceSettingsPage from "../pages/AppearanceSettingsPage"

const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexPage />} />
				<Route path="/lessons" element={<LessonsPage />} />
				<Route path="/statistics" element={<StatisticsPage />} />
				<Route
					path="/appearance-settings"
					element={<AppearanceSettingsPage />}
				/>
			</Route>
		)
	)

	return router
}

export default Router
