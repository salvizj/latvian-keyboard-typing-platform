import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import { useEffect } from 'react';
import { useTypingSession } from '../../hooks/useTypingSession';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import LeftHandVisualization from '../hands/LeftHandVisualization';
import RightHandVisualization from '../hands/RightHandVisualization';
import { completeLesson, hasLessonBeenCompleted } from '../../utils/lessonCompletion';
import { useTyping } from '../../context/TypingContext';

type KeyboardProps = {
    lessonId?: number;
};

const Keyboard: React.FC<KeyboardProps> = ({ lessonId }) => {
    const { showHands, showKeyboardLayout } = useKeyboardSettings();
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
        handFingerInfoObj,
        expectedCharacter,
        expectedCharacterKeyObj,
    } = useTypingSession();

    return (
        <>
            <div className="flex justify-center flex-col items-center max-h-screen">
                {!isTypingFinished && handFingerInfoObj && expectedCharacterKeyObj && (
                    <>
                        <TypingTextDisplay currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <TypingInputField onKeyPress={manageKeyPress} isTypingFinished={isTypingFinished} />

                        <div className="flex items-center justify-between">
                            {showHands && <LeftHandVisualization handFingerInfo={handFingerInfoObj} />}

                            {showKeyboardLayout && (
                                <KeyboardLayout
                                    expectedCharacterKeyObj={expectedCharacterKeyObj}
                                    expectedCharacter={expectedCharacter}
                                />
                            )}

                            {showHands && <RightHandVisualization handFingerInfo={handFingerInfoObj} />}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Keyboard;
