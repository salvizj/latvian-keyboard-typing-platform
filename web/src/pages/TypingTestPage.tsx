import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import OptionBox from '../components/utils/OptionBox';
import Countdown from '../components/utils/Countdown';
import { useOptions } from '../context/OptionsContext';

const TypingTestPage = () => {
    const isRace = false;
    const { time } = useOptions();
    const [timeLeft, setTimeLeft] = useState<number>(time);
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
                <>
                    <Countdown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

                    <Keyboard setTimeLeft={setTimeLeft} timeLeft={timeLeft} isRace={isRace} />
                </>
            )}
        </>
    );
};

export default TypingTestPage;
