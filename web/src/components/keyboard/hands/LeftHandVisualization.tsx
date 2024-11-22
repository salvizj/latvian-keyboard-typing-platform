import { IoHandLeftOutline } from 'react-icons/io5';
import { Finger, Hand, HandFingerInfo } from '../../../types';
import { shouldHighlightFinger } from '../../../utils/shouldHiglight';

type LeftHandVisualizationProps = {
    handFingerInfo: HandFingerInfo;
};

function LeftHandVisualization({ handFingerInfo }: LeftHandVisualizationProps) {
    return (
        <div className="relative w-48 h-48">
            {/* Hand Icon */}
            <IoHandLeftOutline className="w-full h-full" />

            {/* Conditionally highlight each finger based on conditions */}
            {shouldHighlightFinger(handFingerInfo, Hand.Left, Finger.Thumb) && <div className="left-hand-thumb"></div>}
            {shouldHighlightFinger(handFingerInfo, Hand.Left, Finger.Index) && <div className="left-hand-index"></div>}
            {shouldHighlightFinger(handFingerInfo, Hand.Left, Finger.Middle) && (
                <div className="left-hand-middle"></div>
            )}
            {shouldHighlightFinger(handFingerInfo, Hand.Left, Finger.Ring) && <div className="left-hand-ring"></div>}
            {shouldHighlightFinger(handFingerInfo, Hand.Left, Finger.Pinky) && <div className="left-hand-pinky"></div>}
        </div>
    );
}

export default LeftHandVisualization;
