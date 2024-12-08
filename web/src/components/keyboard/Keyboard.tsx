import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import { useTypingSession } from '../../hooks/useTypingSession';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import LeftHandVisualization from '../hands/LeftHandVisualization';
import RightHandVisualization from '../hands/RightHandVisualization';

import { useTyping } from '../../context/TypingContext';

const Keyboard = () => {
    const { showHands, showKeyboardLayout } = useKeyboardSettings();
    const { isTypingFinished } = useTyping();

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
                {!isTypingFinished && (
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
