import { useState } from "react"

export const useCurrentPressedKey = () => {
	const [currentPressedKey, setCurrentPressedKey] = useState<null | string>(
		null
	)

	return {
		currentPressedKey,
		setCurrentPressedKey,
	}
}
