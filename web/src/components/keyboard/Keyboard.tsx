import { useCurrentPressedKey } from "../../hooks/useCurrentPressedKey"
import KeyboardInput from "./KeyboardInput"
import TextDisplayBox from "./TextDisplayBox"
import VirtualKeyboard from "./VirtualKeyboard"
import { useNextKey } from "../../hooks/useNextKey"
import { useEffect, useState } from "react"

type KeyboardProps = {
	text: string
}
const Keyboard: React.FC<KeyboardProps> = ({ text }) => {
	// State to track current Pressed character
	const { setCurrentPressedKey } = useCurrentPressedKey()

	// State to track next key which should be pressed
	const { nextKey, setNextKey } = useNextKey()

	// State to track the index of the current correctly typed character in the text
	const [
		currentCorrectTextCharacterIndex,
		setCurrentCorrectTextCharacterIndex,
	] = useState(0)

	// State to keep track of the next key to press
	const [expectedCharacter, setExpectedCharacter] = useState(text[0])

	const handleKeyPress = (key: string) => {
		setCurrentPressedKey(key)

		// Check if the key pressed matches the expected character
		if (key === expectedCharacter) {
			setCurrentCorrectTextCharacterIndex((prevIndex) => {
				// Move to the next character if the match is correct
				const nextIndex = prevIndex + 1

				if (nextIndex < text.length) {
					setExpectedCharacter(text[nextIndex])
				} else {
					setExpectedCharacter("")
				}
				return nextIndex
			})
		}
	}

	useEffect(() => {
		setNextKey(expectedCharacter)
		console.log(expectedCharacter)
	}, [expectedCharacter, setNextKey])

	return (
		<>
			<TextDisplayBox
				text={text}
				currentCorrectTextCharacterIndex={
					currentCorrectTextCharacterIndex
				}
			/>
			<KeyboardInput handleKeyPress={handleKeyPress} />
			<VirtualKeyboard nextKey={nextKey} />
		</>
	)
}
export default Keyboard
