import { Outlet } from "react-router-dom"
import Dashboard from "../../components/Dashboard/Dashboard"

const Layout = () => {
	return (
		<div>
			<header>
				<Dashboard />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<p>Footer</p>
			</footer>
		</div>
	)
}

export default Layout
