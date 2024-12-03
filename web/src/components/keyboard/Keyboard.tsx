import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import { useEffect } from 'react';
import { useTypingSession } from '../../hooks/useTypingSession';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import LeftHandVisualization from '../hands/LeftHandVisualization';
import RightHandVisualization from '../hands/RightHandVisualization';
import { completeLesson, hasLessonBeenCompleted } from '../../utils/lessonCompletion';
import { useOptions } from '../../context/OptionsContext';
import { useTyping } from '../../context/TypingContext';

type KeyboardProps = {
    lessonId?: number;
};

const Keyboard: React.FC<KeyboardProps> = ({ lessonId }) => {
    const { showHands, showKeyboardLayout } = useKeyboardSettings();
    const { text } = useOptions();
    const { isTypingFinished } = useTyping();

    useEffect(() => {
        if (lessonId !== undefined && isTypingFinished) {
            const completedAlready = hasLessonBeenCompleted(lessonId);
            if (!completedAlready) {
                completeLesson(lessonId);
            }
        }
    }, [isTypingFinished, lessonId]);

    const {
        onKeyPress: manageKeyPress,
        currentCharacterIndex,
        handFingerInfo,
        expectedCharacterKeyObj,
    } = useTypingSession();
    return (
        <>
            <div className="flex justify-center flex-col items-center max-h-screen">
                {!isTypingFinished && handFingerInfo && expectedCharacterKeyObj && (
                    <>
                        <TypingTextDisplay text={text} currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <TypingInputField onKeyPress={manageKeyPress} isTypingFinished={isTypingFinished} />

                        <div className="flex items-center justify-between">
                            {showHands && <LeftHandVisualization handFingerInfo={handFingerInfo} />}
                            {showKeyboardLayout && <KeyboardLayout expectedCharacterKeyObj={expectedCharacterKeyObj} />}

                            {showHands && <RightHandVisualization handFingerInfo={handFingerInfo} />}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Keyboard;
