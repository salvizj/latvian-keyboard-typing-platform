type TextDisplayProps = {
	text: string
	currentCorrectTextCharacterIndex: number
}

const TextDisplayBox: React.FC<TextDisplayProps> = ({
	text,
	currentCorrectTextCharacterIndex,
}) => {
	return (
		<div className="flex justify-center items-center text-3xl gap-1 typing-text-box-bg border border-primary p-2 m-8 ">
			{" "}
			{text
				.replace(/ /g, "·") // replace all spaces with "·"
				.split("")
				.map((char, index) => (
					<span
						key={index}
						className={
							index < currentCorrectTextCharacterIndex
								? "typing-correct-text"
								: "typing-color"
						}
					>
						{char}
					</span>
				))}
		</div>
	)
}

export default TextDisplayBox
