import { IoHandLeftOutline } from "react-icons/io5"
import { Finger, Hand } from "../../../types"

type NextHandFingerProps = {
	handFingerInfo: null | { hand: Hand; finger: Finger }
}

function LeftHand({ handFingerInfo }: NextHandFingerProps) {
	return (
		<div className="relative w-48 h-48">
			{/* Hand Icon */}
			<IoHandLeftOutline className="w-full h-full" />

			{/* Conditionally show finger's color tip */}
			{handFingerInfo?.finger === Finger.Thumb && (
				<div className="left-hand-thumb"></div>
			)}
			{handFingerInfo?.finger === Finger.Index &&
				handFingerInfo.hand === Hand.Left && (
					<div className="left-hand-index"></div>
				)}
			{handFingerInfo?.finger === Finger.Middle &&
				handFingerInfo.hand === Hand.Left && (
					<div className="left-hand-middle"></div>
				)}
			{handFingerInfo?.finger === Finger.Ring &&
				handFingerInfo.hand === Hand.Left && (
					<div className="left-hand-ring"></div>
				)}
			{handFingerInfo?.finger === Finger.Pinky &&
				handFingerInfo.hand === Hand.Left && (
					<div className="left-hand-pinky"></div>
				)}
		</div>
	)
}

export default LeftHand
