import { IoHandRightOutline } from 'react-icons/io5';
import { Finger, Hand, HandFingerInfo } from '../../../types';
import { shouldHighlight } from '../../../utils/shouldHiglight';

type RightHandProps = {
    handFingerInfo: HandFingerInfo;
};

function RightHand({ handFingerInfo }: RightHandProps) {
    return (
        <div className="relative w-48 h-48">
            {/* Hand Icon */}
            <IoHandRightOutline className="w-full h-full" />

            {/* Highlight fingers based on conditions */}
            {shouldHighlight(handFingerInfo, Hand.Right, Finger.Thumb) && <div className="right-hand-thumb"></div>}
            {shouldHighlight(handFingerInfo, Hand.Right, Finger.Index) && <div className="right-hand-index"></div>}
            {shouldHighlight(handFingerInfo, Hand.Right, Finger.Middle) && <div className="right-hand-middle"></div>}
            {shouldHighlight(handFingerInfo, Hand.Right, Finger.Ring) && <div className="right-hand-ring"></div>}
            {shouldHighlight(handFingerInfo, Hand.Right, Finger.Pinky) && <div className="right-hand-pinky"></div>}
        </div>
    );
}

export default RightHand;
