import { IoHandRightOutline } from 'react-icons/io5';
import { Finger, Hand, HandFingerInfo } from '../../../types';

type RightHandProps = {
    handFingerInfo: HandFingerInfo;
};

function RightHand({ handFingerInfo }: RightHandProps) {
    return (
        <div className="relative w-48 h-48">
            {/* Hand Icon */}
            <IoHandRightOutline className="w-full h-full" />

            {/* Conditionally show finger's color tip */}
            {handFingerInfo?.finger === Finger.Thumb ||
                (handFingerInfo.isAlt && (
                    <div className="right-hand-thumb"></div>
                ))}
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
            {(handFingerInfo?.finger === Finger.Pinky &&
                handFingerInfo.hand === Hand.Right) ||
                (handFingerInfo.isShift && handFingerInfo.hand === 'right' && (
                    <div className="right-hand-pinky"></div>
                ))}
        </div>
    );
}

export default RightHand;
