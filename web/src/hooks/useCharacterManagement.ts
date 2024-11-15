import { useState } from "react"
import { Finger, Hand } from "../types"
import { getKeyObjByKey } from "../utils/getKeyObjByKey"

export const useKeyPressManagement = (text: string) => {
	const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0)
	const [expectedCharacter, setExpectedCharacter] = useState(text[0])
	const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(
		null
	)
	const [handFingerInfo, setHandFingerInfo] = useState<{
		hand: Hand
		finger: Finger
	} | null>(null)

	const handleKeyPress = (lastKeyPressed: string) => {
		setCurrentPressedKey(lastKeyPressed)

		if (lastKeyPressed === expectedCharacter) {
			setCurrentCharacterIndex((prevIndex) => {
				const nextIndex = prevIndex + 1
				// Ensure we don't go out of bounds
				if (nextIndex < text.length) {
					const newExpectedCharacter = text[nextIndex]
					setExpectedCharacter(newExpectedCharacter)

					// Get the key object for the new expected character
					const expectedCharacterKeyObj =
						getKeyObjByKey(newExpectedCharacter)
					if (expectedCharacterKeyObj) {
						const { hand, finger } = expectedCharacterKeyObj
						if (hand && finger) {
							setHandFingerInfo({ hand, finger })
						}
					}
				}
				return nextIndex
			})
		}
	}

	return {
		handleKeyPress,
		currentCharacterIndex,
		expectedCharacter,
		currentPressedKey,
		handFingerInfo,
	}
}
