type VirtualKeyboardProps = {
	nextKey: string | null
}
type Key = {
	key: string
	label: string
	size: string
	altKey?: string
	altLabel?: string
}
const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ nextKey }) => {
	const safeNextKey = nextKey || ""

	const keyboardKeyRowss = [
		[
			{ label: "Esc", size: "w-1/12", key: "Esc" },
			{ label: "F1", size: "w-1/12", key: "F1" },
			{ label: "F2", size: "w-1/12", key: "F2" },
			{ label: "F3", size: "w-1/12", key: "F3" },
			{ label: "F4", size: "w-1/12", key: "F4" },
			{ label: "F5", size: "w-1/12", key: "F5" },
			{ label: "F6", size: "w-1/12", key: "F6" },
			{ label: "F7", size: "w-1/12", key: "F7" },
			{ label: "F8", size: "w-1/12", key: "F8" },
			{ label: "F9", size: "w-1/12", key: "F9" },
			{ label: "F10", size: "w-1/12", key: "F10" },
			{ label: "F11", size: "w-1/12", key: "F11" },
			{ label: "F12", size: "w-1/12", key: "F12" },
		],
		[
			{ label: "`", size: "w-1/12", key: "`", altLabel: "~" },
			{ label: "1", size: "w-1/12", key: "1", altLabel: "!" },
			{ label: "2", size: "w-1/12", key: "2", altLabel: "@" },
			{ label: "3", size: "w-1/12", key: "3", altLabel: "#" },
			{ label: "4", size: "w-1/12", key: "4", altLabel: "$" },
			{ label: "5", size: "w-1/12", key: "5", altLabel: "%" },
			{ label: "6", size: "w-1/12", key: "6", altLabel: "^" },
			{ label: "7", size: "w-1/12", key: "7", altLabel: "&" },
			{ label: "8", size: "w-1/12", key: "8", altLabel: "*" },
			{ label: "9", size: "w-1/12", key: "9", altLabel: "(" },
			{ label: "0", size: "w-1/12", key: "0", altLabel: ")" },
			{ label: "-", size: "w-1/12", key: "-", altLabel: "_" },
			{ label: "=", size: "w-1/12", key: "=", altLabel: "+" },
			{ label: "Backspace", size: "w-2/12", key: "Backspace" },
		],
		[
			{ label: "Tab", size: "w-2/12", key: "Tab" },
			{ label: "Q", size: "w-1/12", key: "Q" },
			{ label: "W", size: "w-1/12", key: "W" },
			{ label: "E", size: "w-1/12", key: "E", altKey: "Ē" },
			{ label: "R", size: "w-1/12", key: "R" },
			{ label: "T", size: "w-1/12", key: "T" },
			{ label: "Y", size: "w-1/12", key: "Y" },
			{ label: "U", size: "w-1/12", key: "U", altKey: "Ū" },
			{ label: "I", size: "w-1/12", key: "I", altKey: "Ī" },
			{ label: "O", size: "w-1/12", key: "O" },
			{ label: "P", size: "w-1/12", key: "P" },
			{
				label: "[",
				size: "w-1/12",
				key: "[",
				altLabel: "{",
				altKey: "{",
			},
			{
				label: "]",
				size: "w-1/12",
				key: "]",
				altLabel: "}",
				altKey: "}",
			},
			{
				label: "\\",
				size: "w-1/12",
				key: "\\",
				altLabel: "|",
				altKey: "|",
			},
		],
		[
			{ label: "Caps", size: "w-2/12", key: "Caps" },
			{ label: "A", size: "w-1/12", key: "A", altKey: "Ā" },
			{ label: "S", size: "w-1/12", key: "S", altKey: "Š" },
			{ label: "D", size: "w-1/12", key: "D" },
			{ label: "F", size: "w-1/12", key: "F" },
			{ label: "G", size: "w-1/12", key: "G", altKey: "Ģ" },
			{ label: "H", size: "w-1/12", key: "H" },
			{ label: "J", size: "w-1/12", key: "J" },
			{ label: "K", size: "w-1/12", key: "K", altKey: "Ķ" },
			{ label: "L", size: "w-1/12", key: "L", altKey: "Ļ" },
			{ label: ";", size: "w-1/12", key: ";", altLabel: ":" },
			{ label: "'", size: "w-1/12", key: "'", altLabel: '"' },
			{ label: "Enter", size: "w-2/12", key: "Enter" },
		],
		[
			{ label: "Shift", size: "w-2/12", key: "Shift" },
			{ label: "Z", size: "w-1/12", key: "Z" },
			{ label: "X", size: "w-1/12", key: "X" },
			{ label: "C", size: "w-1/12", key: "C", altKey: "Č" },
			{ label: "V", size: "w-1/12", key: "V" },
			{ label: "B", size: "w-1/12", key: "B" },
			{ label: "N", size: "w-1/12", key: "N", altKey: "Ņ" },
			{ label: "M", size: "w-1/12", key: "M" },
			{
				label: ",",
				size: "w-1/12",
				key: ",",
				altLabel: "<",
				altKey: "<",
			},
			{
				label: ".",
				size: "w-1/12",
				key: ".",
				altLabel: ">",
				altKey: ">",
			},
			{
				label: "/",
				size: "w-1/12",
				key: "/",
				altLabel: "?",
				altKey: "?",
			},
			{ label: "Shift", size: "w-2/12", key: "Shift" },
		],
		[
			{ label: "Ctrl", size: "w-2/12", key: "Ctrl" },
			{ label: "Win", size: "w-1/12", key: "Win" },
			{ label: "Alt", size: "w-2/12", key: "Alt" },
			{ label: "Space", size: "w-6/12", key: " " },
			{ label: "Alt", size: "w-2/12", key: "Alt" },
			{ label: "Win", size: "w-1/12", key: "Win" },
			{ label: "Fn", size: "w-1/12", key: "Fn" },
			{ label: "Ctrl", size: "w-2/12", key: "Ctrl" },
		],
	]

	function getKeyClass(nextKey: string, key: Key) {
		const isKeyMatch =
			nextKey === key.key ||
			nextKey === key.key.toLowerCase() ||
			nextKey === key.altKey ||
			nextKey === key.altKey?.toLowerCase()

		return `${isKeyMatch ? "next-key-bg-color" : ""}`
	}

	return (
		<div className="keyboard flex flex-col items-center gap-2 p-6 bg-aside-bg rounded-md max-w-full min-w-[800px] mx-auto">
			{keyboardKeyRowss.map((keyboardKeyRows, keyboardKeyRowsIndex) => (
				<div
					key={keyboardKeyRowsIndex}
					className="flex w-full gap-2 justify-center"
				>
					{keyboardKeyRows.map((key) => (
						<div
							key={key.label}
							className={`key flex items-center justify-center h-[2rem] md:h-[2.5rem] rounded-sm border border-primary text-secondary tracking-wide ${
								key.size
							} ${getKeyClass(safeNextKey, key)}`}
						>
							{key.label}
							{key.altLabel}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default VirtualKeyboard
