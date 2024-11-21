import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import TypingTestOptionScreen from '../components/typingTest/TypingTestOptionScreen';

const TypingTestPage = () => {
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [startTest, setStartTest] = useState(false);
    return (
        <>
            {!startTest && <TypingTestOptionScreen setText={setText} setTime={setTime} setStartTest={setStartTest} />}
            {startTest && <Keyboard text={text} testMode={true} time={time} />}
        </>
    );
};

export default TypingTestPage;
