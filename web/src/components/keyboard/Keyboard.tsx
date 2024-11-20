import KeyboardInput from './KeyboardInput';
import TextDisplayBox from './TextDisplayBox';
import VirtualKeyboard from './VirtualKeyboard';
import LeftHand from './Hands/LeftHand';
import RightHand from './Hands/RightHand';
import { useKeyPressManagement } from '../../hooks/useCharacterManagement';
import LessonFinishedScreen from '../Lesson/LessonFinishedScreen';

type KeyboardProps = {
    text: string;
    setFinished: (finished: boolean) => void;
    finished: boolean;
};

const Keyboard: React.FC<KeyboardProps> = ({ text, setFinished, finished }) => {
    const {
        handleKeyPress: manageKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        handFingerInfo,
        expectedCharacterKeyObj,
    } = useKeyPressManagement(text, setFinished, finished);

    const restartLesson = () => {
        window.location.reload();
    };

    return (
        <>
            <div className="flex justify-center flex-col items-center min-h-screen">
                {expectedCharacterKeyObj && handFingerInfo && (
                    <>
                        <TextDisplayBox
                            text={text}
                            currentCorrectTextCharacterIndex={
                                currentCharacterIndex
                            }
                        />

                        <KeyboardInput
                            handleKeyPress={manageKeyPress}
                            finished={finished}
                        />

                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <LeftHand handFingerInfo={handFingerInfo} />
                            </div>

                            <div className="flex-grow mx-4">
                                <VirtualKeyboard
                                    expectedCharacter={expectedCharacter}
                                    expectedCharacterKeyObj={
                                        expectedCharacterKeyObj
                                    }
                                />
                            </div>

                            <div className="flex-shrink-0">
                                <RightHand handFingerInfo={handFingerInfo} />
                            </div>
                        </div>

                        {finished && (
                            <div className="fixed inset-0 z-50">
                                <LessonFinishedScreen
                                    finished={finished}
                                    setFinished={setFinished}
                                    restartLesson={restartLesson}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Keyboard;
