import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import LeftHandVisualization from '../hands/LeftHandVisualization';
import RightHandVisualization from '../hands/RightHandVisualization';

import { useTyping } from '../../context/TypingContext';
import useTypingSession from '../../hooks/useTypingSession';

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
            <div className="flex flex-col items-center justify-center sm:px-4 lg:px-8">
                {!isTypingFinished && (
                    <>
                        <TypingTextDisplay currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <TypingInputField onKeyPress={manageKeyPress} isTypingFinished={isTypingFinished} />

                        <div className="flex flex-wrap items-center justify-center lg:flex-row">
                            {showHands && (
                                <div className="hidden xl:flex justify-center xl:mr-4">
                                    <LeftHandVisualization handFingerInfo={handFingerInfoObj} />
                                </div>
                            )}

                            {showKeyboardLayout && (
                                <div className="flex justify-center xl:mx-4">
                                    <KeyboardLayout
                                        expectedCharacterKeyObj={expectedCharacterKeyObj}
                                        expectedCharacter={expectedCharacter}
                                    />
                                </div>
                            )}

                            {showHands && (
                                <div className="hidden xl:flex justify-center xl:ml-4">
                                    <RightHandVisualization handFingerInfo={handFingerInfoObj} />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Keyboard;
