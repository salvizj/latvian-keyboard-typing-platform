import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import LessonFinishedScreen from '../lesson/LessonFinishedScreen';
import { useEffect, useState } from 'react';
import { isLessonComplete, markLessonComplete } from '../../utils/lessonCompletion';
import Countdown from '../utils/Countdown';
import TypingTestFinishedScreen from '../utils/TypingFinishedScreen';
import RightHandVisualization from './hands/RightHandVisualization';
import LeftHandVisualization from './hands/LeftHandVisualization';
import RealTimeTypingPerformance from './RealTimeTypingPerformance';
import { useTypingSession } from '../../hooks/useCharacterManagement';
import { markTestComplete } from '../../utils/testCompletion';

type KeyboardProps = {
    text: string;
    lessonId?: number;
    lessonMode?: boolean;
    raceMode?: boolean;
    testMode?: boolean;
    time?: number;
};

const Keyboard: React.FC<KeyboardProps> = ({ text, lessonMode, lessonId, testMode, raceMode, time }) => {
    const [isTypingFinished, setFinished] = useState(false);

    useEffect(() => {
        if (lessonId && lessonMode && isTypingFinished) {
            const completedAlready = isLessonComplete(lessonId);
            if (!completedAlready) markLessonComplete(lessonId);
        }
    }, [isTypingFinished, lessonId, lessonMode]);

    useEffect(() => {
        if (testMode && isTypingFinished && time) {
            markTestComplete(wpm, mistakeCount, text, time);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTypingFinished, testMode, lessonMode]);

    const {
        onKeyPress: manageKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        handFingerInfo,
        expectedCharacterKeyObj,
        wpm,
        mistakeCount,
    } = useTypingSession(text, setFinished, isTypingFinished);

    const restart = () => {
        window.location.reload();
    };
    console.log(raceMode);
    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen">
                {expectedCharacterKeyObj && handFingerInfo && (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            {time && (
                                <Countdown time={time} setFinished={setFinished} isTypingFinished={isTypingFinished} />
                            )}
                            <RealTimeTypingPerformance wpm={wpm} mistakesCount={mistakeCount} />{' '}
                        </div>

                        <TypingTextDisplay text={text} currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <TypingInputField onKeyPress={manageKeyPress} isTypingFinished={isTypingFinished} />
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <LeftHandVisualization handFingerInfo={handFingerInfo} />
                            </div>

                            <div className="flex-grow mx-4">
                                <KeyboardLayout
                                    expectedCharacter={expectedCharacter}
                                    expectedCharacterKeyObj={expectedCharacterKeyObj}
                                />
                            </div>

                            <div className="flex-shrink-0">
                                <RightHandVisualization handFingerInfo={handFingerInfo} />
                            </div>
                        </div>
                    </>
                )}
                {isTypingFinished && lessonMode && (
                    <div className="fixed inset-0 z-50">
                        <LessonFinishedScreen setFinished={setFinished} restart={restart} />
                    </div>
                )}
                {isTypingFinished && testMode && (
                    <div className="fixed inset-0 z-50">
                        <TypingTestFinishedScreen setFinished={setFinished} restart={restart} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Keyboard;
