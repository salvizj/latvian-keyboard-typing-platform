import { Link } from "react-router-dom"
import Links from "./Links"
import translate from "../../utils/translate"

const Navigation = () => {
	return (
		<nav className="flex flex-col justify-center items-center">
			{Object.entries(Links).map(([key, path]) => (
				<Link to={path}> {translate(key)}</Link>
			))}
		</nav>
	)
}

export default Navigation
