import { IoHandLeftOutline } from 'react-icons/io5';
import { Finger, Hand, HandFingerInfo } from '../../../types';
import { shouldHighlight } from '../../../utils/shouldHiglight';

type LeftHandProps = {
    handFingerInfo: HandFingerInfo;
};

function LeftHand({ handFingerInfo }: LeftHandProps) {
    return (
        <div className="relative w-48 h-48">
            {/* Hand Icon */}
            <IoHandLeftOutline className="w-full h-full" />

            {/* Conditionally highlight each finger based on conditions */}
            {shouldHighlight(handFingerInfo, Hand.Left, Finger.Thumb) && (
                <div className="left-hand-thumb"></div>
            )}
            {shouldHighlight(handFingerInfo, Hand.Left, Finger.Index) && (
                <div className="left-hand-index"></div>
            )}
            {shouldHighlight(handFingerInfo, Hand.Left, Finger.Middle) && (
                <div className="left-hand-middle"></div>
            )}
            {shouldHighlight(handFingerInfo, Hand.Left, Finger.Ring) && (
                <div className="left-hand-ring"></div>
            )}
            {shouldHighlight(handFingerInfo, Hand.Left, Finger.Pinky) && (
                <div className="left-hand-pinky"></div>
            )}
        </div>
    );
}

export default LeftHand;
