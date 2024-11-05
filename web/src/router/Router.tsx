import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom"
import AboutPage from "../pages/AboutPage"
import IndexPage from "../pages/IndexPage"
import Layout from "../pages/Layout/Layout"

const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexPage />} />
				<Route path="about" element={<AboutPage />} />
			</Route>
		)
	)

	return router
}

export default Router
