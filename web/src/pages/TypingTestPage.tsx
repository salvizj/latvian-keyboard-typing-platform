import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import OptionBox from '../components/utils/OptionBox';
import Countdown from '../components/utils/Countdown';
import TypingStats from '../components/keyboard/TypingStats';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useNavigate } from 'react-router-dom';
import { useTyping } from '../context/TypingContext';

const TypingTestPage = () => {
    const isRace = false;
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const { isTypingFinished } = useTyping();

    const navigate = useNavigate();

    return (
        <>
            {!isOptionsSet && (
                <OptionBox
                    setIsOptionsSet={setIsOptionsSet}
                    title="typing_test"
                    startText="start_test"
                    isRace={isRace}
                />
            )}
            {isOptionsSet && (
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Countdown start={isOptionsSet} />
                    <TypingStats start={isOptionsSet} />
                    <Keyboard />
                    {isTypingFinished && (
                        <CompletionScreen
                            title="typing_test_completed"
                            buttons={[
                                {
                                    text: 'home',
                                    onClick: () => navigate('/'),
                                },
                                {
                                    text: 'restart',
                                    onClick: () => window.location.reload(),
                                },
                            ]}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default TypingTestPage;
