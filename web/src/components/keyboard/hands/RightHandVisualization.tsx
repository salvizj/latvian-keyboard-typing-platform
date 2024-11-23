import { IoHandRightOutline } from 'react-icons/io5';
import { Finger, Hand, HandFingerInfo } from '../../../types';
import { shouldHighlightFinger } from '../../../utils/shouldHiglight';

type RightHandVisualizationProps = {
    handFingerInfo: HandFingerInfo;
};

function RightHandVisualization({ handFingerInfo }: RightHandVisualizationProps) {
    return (
        <div className="relative w-48 h-48 flex-shrink-0">
            {/* Hand Icon */}
            <IoHandRightOutline className="w-full h-full" />

            {/* Highlight fingers based on conditions */}
            {shouldHighlightFinger(handFingerInfo, Hand.Right, Finger.Thumb) && (
                <div className="right-hand-thumb"></div>
            )}
            {shouldHighlightFinger(handFingerInfo, Hand.Right, Finger.Index) && (
                <div className="right-hand-index"></div>
            )}
            {shouldHighlightFinger(handFingerInfo, Hand.Right, Finger.Middle) && (
                <div className="right-hand-middle"></div>
            )}
            {shouldHighlightFinger(handFingerInfo, Hand.Right, Finger.Ring) && <div className="right-hand-ring"></div>}
            {shouldHighlightFinger(handFingerInfo, Hand.Right, Finger.Pinky) && (
                <div className="right-hand-pinky"></div>
            )}
        </div>
    );
}

export default RightHandVisualization;
