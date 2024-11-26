import TypingInputField from './TypingInputField';
import TypingTextDisplay from './TypingTextDisplay';
import KeyboardLayout from './KeyboardLayout';
import { useEffect, useState } from 'react';
import { isLessonComplete, markLessonComplete } from '../../utils/lessonCompletion';
import Countdown from '../utils/Countdown';
import RightHandVisualization from './hands/RightHandVisualization';
import LeftHandVisualization from './hands/LeftHandVisualization';
import RealTimeTypingPerformance from './RealTimeTypingPerformance';
import { useTypingSession } from '../../hooks/useCharacterManagement';
import CompletionScreen from '../utils/CompletionScreen';
import LessonCompletedScreen from '../lesson/LessonCompletedScreen';
import { WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../../types';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import constructWebSocketMessage from '../../utils/constructWebsocketMessage';

type KeyboardProps = {
    text: string;
    wpm: number;
    setWpm: (wpm: number) => void;
    mistakeCount: number;
    setMistakeCount: (mistakeCount: number) => void;
    lessonId?: number;
    lessonMode?: boolean;
    isRace?: boolean;
    time?: number;
    lobbyId?: string;
    timeLeft?: number;
    setTimeLeft?: (time: number) => void;
    sendMessage?: (message: WebSocketMessage<WebSocketMessageData>) => void;
    setProcentsOfTextTyped?: (procentsOfTextTyped: number) => void;
};

const Keyboard: React.FC<KeyboardProps> = ({
    text,
    wpm,
    setWpm,
    lobbyId,
    mistakeCount,
    setMistakeCount,
    lessonId,
    lessonMode,
    isRace,
    time,
    timeLeft,
    setTimeLeft,
    sendMessage,
    setProcentsOfTextTyped,
}) => {
    const { showHands, showKeyboardLayout } = useKeyboardSettings();
    const [isTypingFinished, setFinished] = useState(false);
    useEffect(() => {
        if (lessonId && isRace === undefined && isTypingFinished) {
            const completedAlready = isLessonComplete(lessonId);
            if (!completedAlready) markLessonComplete(lessonId);
        }
    }, [isRace, isTypingFinished, lessonId, lessonMode]);

    useEffect(() => {
        if (isRace && timeLeft === 0 && sendMessage) {
            const endRaceMessage = constructWebSocketMessage({
                messageType: WebSocketMessageType.EndRace,
                lobbyId: lobbyId,
            });
            if (endRaceMessage) sendMessage(endRaceMessage);
        }
    }, [isRace, lobbyId, sendMessage, timeLeft]);

    const {
        onKeyPress: manageKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        handFingerInfo,
        expectedCharacterKeyObj,
    } = useTypingSession(
        text,
        setFinished,
        isTypingFinished,
        mistakeCount,
        setMistakeCount,
        setWpm,
        setProcentsOfTextTyped
    );

    const restart = () => {
        window.location.reload();
    };
    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen">
                {expectedCharacterKeyObj && handFingerInfo && (
                    <>
                        <div className="flex flex-col justify-center items-center">
                            {time && timeLeft && setTimeLeft && (
                                <Countdown
                                    time={time}
                                    setFinished={setFinished}
                                    isTypingFinished={isTypingFinished}
                                    timeLeft={timeLeft}
                                    setTimeLeft={setTimeLeft}
                                />
                            )}
                            <RealTimeTypingPerformance wpm={wpm} mistakesCount={mistakeCount} />{' '}
                        </div>

                        <TypingTextDisplay text={text} currentCorrectTextCharacterIndex={currentCharacterIndex} />
                        <TypingInputField onKeyPress={manageKeyPress} isTypingFinished={isTypingFinished} />
                        <div className="flex items-center justify-between">
                            {showHands && <LeftHandVisualization handFingerInfo={handFingerInfo} />}
                            {showKeyboardLayout && (
                                <KeyboardLayout
                                    expectedCharacter={expectedCharacter}
                                    expectedCharacterKeyObj={expectedCharacterKeyObj}
                                />
                            )}

                            {showHands && <RightHandVisualization handFingerInfo={handFingerInfo} />}
                        </div>
                    </>
                )}
                {isTypingFinished && lessonMode && (
                    <LessonCompletedScreen setFinished={setFinished} restart={restart} />
                )}
                {isTypingFinished && isRace === undefined && (
                    <CompletionScreen
                        buttons={[
                            {
                                text: 'restart',
                                onClick: restart,
                            },
                        ]}
                        wpm={wpm}
                        mistakeCount={mistakeCount}
                        title="typing_test_completed"
                    />
                )}
            </div>
        </>
    );
};

export default Keyboard;
