import { useState } from "react"
import Input from "../utils/Input"
import Label from "../utils/Label"

type KeyboardInputProps = {
	handleKeyPress: (lastKeyPress: string) => void
}

const KeyboardInput: React.FC<KeyboardInputProps> = ({ handleKeyPress }) => {
	const [lastKey, setLastKey] = useState<string>("")

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Get the last character typed
		const keyPressed = e.target.value.slice(-1)
		setLastKey(keyPressed)
		handleKeyPress(keyPressed)
	}

	return (
		<div className="max-w-lg mx-auto p-4">
			<form>
				<div className="mb-6">
					<Label text="keyboard_input_label" htmlFor="inputField" />
					<Input
						id="inputField"
						type="text"
						value={lastKey}
						onChange={handleInputChange}
						placeholder=""
						required
					/>
				</div>
			</form>
		</div>
	)
}

export default KeyboardInput
