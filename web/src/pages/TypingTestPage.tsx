import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import OptionBox from '../components/utils/OptionBox';
import Countdown from '../components/utils/Countdown';
import TypingStats from '../components/keyboard/TypingStats';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useNavigate } from 'react-router-dom';
import { useTyping } from '../context/TypingContext';
import { useLanguage } from '../context/LanguageContext';
import usePostTypingTest from '../hooks/usePostTypingTest';

const TypingTestPage = () => {
    const isRace = false;
    useLanguage();
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const { isTypingFinished } = useTyping();
    const { error } = usePostTypingTest();
    const navigate = useNavigate();

    // show completion screen if typing is over
    if (isTypingFinished) {
        return (
            <CompletionScreen
                title="typing_test_completed"
                error={error}
                showMetrics={true}
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
        );
    }

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
                </div>
            )}
        </>
    );
};

export default TypingTestPage;
