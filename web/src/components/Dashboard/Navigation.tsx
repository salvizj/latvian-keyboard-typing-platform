import { Link } from "react-router-dom"
import Links from "./Links"

const Navigation = () => {
	return (
		<nav>
			{Object.entries(Links).map(([key, path]) => (
				<Link to={path}>{key}</Link>
			))}
		</nav>
	)
}
export default Navigation
