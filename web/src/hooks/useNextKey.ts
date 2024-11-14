import { useState } from "react"

export const useNextKey = () => {
	const [nextKey, setNextKey] = useState<null | string>(null)

	return {
		nextKey,
		setNextKey,
	}
}
