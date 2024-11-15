import { Outlet } from "react-router-dom"
import Dashboard from "../../components/Dashboard/Dashboard"

const Layout = () => {
	return (
		<div className="flex h-screen">
			<div className="w-10/12 flex flex-col">
				<main className="flex-grow">
					<Outlet />
				</main>
				<footer>
					<p>Footer</p>
				</footer>
			</div>

			<aside className="absolute right-0 top-0 h-full w-2/12 aside-bg">
				<Dashboard />
			</aside>
		</div>
	)
}

export default Layout
