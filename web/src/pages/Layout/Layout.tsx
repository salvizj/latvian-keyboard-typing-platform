import { Outlet } from "react-router-dom"
import Dashboard from "../../components/Dashboard/Dashboard"

const Layout = () => {
	return (
		<div className="flex h-screen">
			<div className="flex-1 flex flex-col">
				<main className="flex flex-col justify-center items-center w-full min-h-screen">
					<Outlet />
				</main>
				<footer>
					<p>Footer</p>
				</footer>
			</div>

			<aside className=" h-full w-2/12 aside-bg">
				<Dashboard />
			</aside>
		</div>
	)
}

export default Layout
