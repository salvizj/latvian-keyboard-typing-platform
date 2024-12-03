import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import OptionBox from '../components/utils/OptionBox';
import Countdown from '../components/utils/Countdown';
import TypingStats from '../components/keyboard/TypingStats';

const TypingTestPage = () => {
    const isRace = false;
    const [isOptionsSet, setIsOptionsSet] = useState(false);
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
