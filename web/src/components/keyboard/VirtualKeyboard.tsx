import { KeyObj } from "../../types"
import { keyObjRows } from "../../utils/keyObjRows"

type VirtualKeyboardProps = {
	expectedCharacter: string
}

const KeyComponent: React.FC<{ keyData: KeyObj; isNextKey: boolean }> = ({
	keyData,
	isNextKey,
}) => (
	<div
		className={`key flex items-center justify-center h-[2rem] md:h-[2.5rem] rounded-sm border keyboard-border primary-text tracking-wide ${
			keyData.size
		} ${isNextKey ? "next-key" : ""}`}
	>
		{keyData.label}
		{keyData.altLabel && <span>{keyData.altLabel}</span>}
	</div>
)

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
	expectedCharacter,
}) => {
	return (
		<div className="keyboard flex flex-col items-center gap-2 p-6 aside-bg rounded-md max-w-full min-w-[800px] mx-auto">
			{keyObjRows.map((keyObjRow, keyObjRowIndex) => (
				<div
					key={keyObjRowIndex}
					className="flex w-full gap-2 justify-center"
				>
					{keyObjRow.map((keyObj: KeyObj, keyObjRowIndex: number) => {
						// Find keyObj from keyObjRow who matches
						const isNextKey =
							expectedCharacter.toLowerCase() ===
							keyObj.key.toLowerCase()

						return (
							<KeyComponent
								key={`-${keyObjRowIndex}-${keyObj.key}`}
								keyData={keyObj}
								isNextKey={isNextKey}
							/>
						)
					})}
				</div>
			))}
		</div>
	)
}

export default VirtualKeyboard
