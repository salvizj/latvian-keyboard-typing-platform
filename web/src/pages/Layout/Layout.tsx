import { Outlet } from "react-router-dom"
import Dashboard from "../../components/Dashboard/Dashboard"

const Layout = () => {
	return (
		<div className="flex h-screen">
			<div className="flex-1 flex flex-col">
				<main className="flex-grow  p-4">
					<Outlet />
				</main>
				<footer className=" ">
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
