type TextDisplayProps = {
	text: string
	currentCorrectTextCharacterIndex: number
}

const TextDisplayBox: React.FC<TextDisplayProps> = ({
	text,
	currentCorrectTextCharacterIndex,
}) => {
	return (
		<div className="flex justify-center items-center text-4xl gap-2 bg-transparent border border-primary p-2 m-2 text-display-box-text-color">
			{" "}
			{text
				.replace(/ /g, "·") // replace all spaces with "·"
				.split("")
				.map((char, index) => (
					<span
						key={index}
						className={
							index < currentCorrectTextCharacterIndex
								? "correct-text-color"
								: ""
						}
					>
						{char}
					</span>
				))}
		</div>
	)
}

export default TextDisplayBox
