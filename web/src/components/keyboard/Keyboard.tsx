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
import { markTestComplete } from '../../utils/testCompletion';
import { useLanguage } from '../../context/LanguageContext';
import CompletionScreen from '../utils/CompletionScreen';
import LessonCompletedScreen from '../lesson/LessonCompletedScreen';
import { EndRaceData, LobbyStatus, WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../../types';

type KeyboardProps = {
    text: string;
    wpm: number;
    setWpm: (wpm: number) => void;
    mistakeCount: number;
    setMistakeCount: (mistakeCount: number) => void;
    lessonId?: number;
    lessonMode?: boolean;
    raceMode?: boolean;
    testMode?: boolean;
    time?: number;
    timeLeft?: number;
    setTimeLeft?: (time: number) => void;
    sendMessage?: (message: WebSocketMessage<WebSocketMessageData>) => void;
    setProcentsOfTextTyped?: (procentsOfTextTyped: number) => void;
};

const Keyboard: React.FC<KeyboardProps> = ({
    text,
    wpm,
    setWpm,
    mistakeCount,
    setMistakeCount,
    lessonId,
    lessonMode,
    raceMode,
    testMode,
    time,
    timeLeft,
    setTimeLeft,
    sendMessage,
    setProcentsOfTextTyped,
}) => {
    const { language } = useLanguage();

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

    useEffect(() => {
        if (raceMode && timeLeft === 0 && sendMessage) {
            const endRaceMessage: WebSocketMessage<EndRaceData> = {
                type: WebSocketMessageType.EndRace,
                lobbyId: '',
                status: LobbyStatus.Finished,
                data: {},
            };
            sendMessage(endRaceMessage);
        }
    }, [raceMode, sendMessage, timeLeft]);

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
                            <LeftHandVisualization handFingerInfo={handFingerInfo} />

                            <KeyboardLayout
                                expectedCharacter={expectedCharacter}
                                expectedCharacterKeyObj={expectedCharacterKeyObj}
                            />

                            <RightHandVisualization handFingerInfo={handFingerInfo} />
                        </div>
                    </>
                )}
                {isTypingFinished && lessonMode && (
                    <LessonCompletedScreen setFinished={setFinished} restart={restart} language={language} />
                )}
                {isTypingFinished && testMode && (
                    <CompletionScreen
                        buttons={[
                            {
                                text: 'restart',
                                onClick: restart,
                            },
                        ]}
                        wpm={wpm}
                        mistakeCount={mistakeCount}
                        language={language}
                        title="typing_test_completed"
                    />
                )}
            </div>
        </>
    );
};

export default Keyboard;
