import { IoHandLeftOutline } from 'react-icons/io5';
import { shouldHighlightFinger } from '../../utils/shouldHighlightFinger';
import { Finger, Hand, HandFingerInfoObj } from '../../types';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type LeftHandVisualizationProps = {
    handFingerInfo: HandFingerInfoObj | null;
};

function LeftHandVisualization({ handFingerInfo }: LeftHandVisualizationProps) {
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
            {/* hand Icon */}
            <IoHandLeftOutline className="w-full h-full" />

            {/* conditionally highlight each finger based on conditions */}
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
