import { Link } from "react-router-dom"
import Links from "./Links"

const Navigation = () => {
	return (
		<nav>
			{Object.entries(Links).map(([label, path]) => (
				<Link to={path}>{label}</Link>
			))}
		</nav>
	)
}
export default Navigation
