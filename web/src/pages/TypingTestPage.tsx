import { useState } from 'react';
import Keyboard from '../components/keyboard/Keyboard';
import OptionBox from '../components/utils/OptionBox';
import { useGetPoetTexts } from '../hooks/useGetPoetTexts';

const TypingTestPage = () => {
    const isRace = false;
    const [text, setText] = useState<string>('');
    const [time, setTime] = useState<number>(60);
    const [isOptionsSet, setIsOptionsSet] = useState(false);
    const [isCustomText, setIsCustomText] = useState(false);
    const [customText, setCustomText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [wpm, setWpm] = useState(0);
    const [mistakeCount, setMistakeCount] = useState(0);
    const { poetTexts, poetTextsError } = useGetPoetTexts();

    return (
        <>
            {!isOptionsSet && (
                <OptionBox
                    setIsOptionsSet={setIsOptionsSet}
                    setText={setText}
                    setTime={setTime}
                    time={time}
                    isCustomText={isCustomText}
                    customText={customText}
                    selectedText={selectedText}
                    setIsCustomText={setIsCustomText}
                    setCustomText={setCustomText}
                    setSelectedText={setSelectedText}
                    poetTexts={poetTexts}
                    poetTextsError={poetTextsError}
                    title="typing_test"
                    startText="start_test"
                    isRace={isRace}
                />
            )}
            {isOptionsSet && (
                <Keyboard
                    text={text}
                    testMode={true}
                    time={time}
                    wpm={wpm}
                    setWpm={setWpm}
                    mistakeCount={mistakeCount}
                    setMistakeCount={setMistakeCount}
                />
            )}
        </>
    );
};

export default TypingTestPage;
