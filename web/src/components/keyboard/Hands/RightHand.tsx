import { IoHandRightOutline } from "react-icons/io5"
import { Finger, Hand } from "../../../types"

type HandFingerProps = {
	handFingerInfo: null | { hand: Hand; finger: Finger }
}

function RightHand({ handFingerInfo }: HandFingerProps) {
	return (
		<div className="relative w-48 h-48">
			{/* Hand Icon */}
			<IoHandRightOutline className="w-full h-full" />

			{/* Conditionally show finger's color tip */}
			{handFingerInfo?.finger === Finger.Thumb && (
				<div className="right-hand-thumb"></div>
			)}
			{handFingerInfo?.finger === Finger.Index &&
				handFingerInfo.hand === Hand.Right && (
					<div className="right-hand-index"></div>
				)}
			{handFingerInfo?.finger === Finger.Middle &&
				handFingerInfo.hand === Hand.Right && (
					<div className="right-hand-middle"></div>
				)}
			{handFingerInfo?.finger === Finger.Ring &&
				handFingerInfo.hand === Hand.Right && (
					<div className="right-hand-ring"></div>
				)}
			{handFingerInfo?.finger === Finger.Pinky &&
				handFingerInfo.hand === Hand.Right && (
					<div className="right-hand-pinky"></div>
				)}
		</div>
	)
}

export default RightHand
