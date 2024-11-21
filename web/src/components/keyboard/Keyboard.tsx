import KeyboardInput from './KeyboardInput';
import TextDisplayBox from './TextDisplayBox';
import VirtualKeyboard from './VirtualKeyboard';
import LeftHand from './hands/LeftHand';
import RightHand from './hands/RightHand';
import { useKeyPressManagement } from '../../hooks/useCharacterManagement';
import LessonFinishedScreen from '../lesson/LessonFinishedScreen';
import { useEffect, useState } from 'react';
import { isLessonComplete, markLessonComplete } from '../../utils/lessonCompletion';
import Countdown from '../utils/Countdown';
import TypingTestFinishedScreen from '../typingTest/TypingTestFinishedScreen';

type KeyboardProps = {
    text: string;
    lessonId?: number;
    lessonMode?: boolean;
    raceMode?: boolean;
    testMode?: boolean;
    time?: number;
};

const Keyboard: React.FC<KeyboardProps> = ({ text, lessonMode, lessonId, testMode, raceMode, time }) => {
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (lessonId && lessonMode && finished) {
            const completedAlready = isLessonComplete(lessonId);
            if (!completedAlready) markLessonComplete(lessonId);
        }
    }, [finished, lessonId, lessonMode]);

    const {
        handleKeyPress: manageKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        handFingerInfo,
        expectedCharacterKeyObj,
    } = useKeyPressManagement(text, setFinished, finished);

    const restart = () => {
        window.location.reload();
    };
    console.log(raceMode);
    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen">
                {expectedCharacterKeyObj && handFingerInfo && (
                    <>
                        {time && <Countdown time={time} setFinished={setFinished} finished={finished} />}

                        <TextDisplayBox text={text} currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <KeyboardInput handleKeyPress={manageKeyPress} finished={finished} />
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <LeftHand handFingerInfo={handFingerInfo} />
                            </div>

                            <div className="flex-grow mx-4">
                                <VirtualKeyboard
                                    expectedCharacter={expectedCharacter}
                                    expectedCharacterKeyObj={expectedCharacterKeyObj}
                                />
                            </div>

                            <div className="flex-shrink-0">
                                <RightHand handFingerInfo={handFingerInfo} />
                            </div>
                        </div>
                    </>
                )}
                {finished && lessonMode && (
                    <div className="fixed inset-0 z-50">
                        <LessonFinishedScreen setFinished={setFinished} restart={restart} />
                    </div>
                )}
                {finished && testMode && (
                    <div className="fixed inset-0 z-50">
                        <TypingTestFinishedScreen setFinished={setFinished} restart={restart} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Keyboard;
