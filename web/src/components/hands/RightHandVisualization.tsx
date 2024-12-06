import { IoHandRightOutline } from 'react-icons/io5';
import { shouldHighlightFinger } from '../../utils/shouldHighlightFinger';
import { Finger, Hand, HandFingerInfoObj } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type RightHandVisualizationProps = {
    handFingerInfo: HandFingerInfoObj;
};

function RightHandVisualization({ handFingerInfo }: RightHandVisualizationProps) {
    const { language } = useLanguage();

    if (handFingerInfo === null || handFingerInfo === undefined) {
        return (
            <p className="text-lg text-red-500 flex justify-center items-center h-full">
                {translate('error_hand_finger_info_not_found', language)}
            </p>
        );
    }
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
