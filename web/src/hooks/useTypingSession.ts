import { useCallback, useEffect, useState } from 'react';
import { HandFingerInfoObj, KeyObj } from '../types';
import { isLatvianSpecial, isUpperCaseLatvian } from '../utils/latvian-utils';
import { useKeyboardSettings } from '../context/KeyboardSettingsContext';
import { findKeyObjInLayout } from '../utils/findKeyObjInLayout';
import { getLayout } from '../utils/getLayout';
import { useOptions } from '../context/OptionsContext';
import { useTyping } from '../context/TypingContext';
import { updateWpm } from '../utils/updateWpm';
import { resetTypingState } from '../utils/resetTypingState';
import { updateTypingProgress } from '../utils/updateTypingProgress';
import { updateHandFingerInfoObj } from '../utils/updateHandFingerInfoObj';

const useTypingSession = () => {
    const { text, time, timeLeft } = useOptions();
    const { setpercentageOfTextTyped, isTypingFinished, setIsTypingFinished, setMistakeCount, setWpm } = useTyping();
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);

    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] = useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(null);
    const [handFingerInfoObj, setHandFingerInfoObj] = useState<HandFingerInfoObj | null>(null);

    // determines the next character to be typed and updates state
    const processNextCharacter = useCallback(
        (nextIndex: number): number => {
            const newExpectedCharacter = text[nextIndex];
            // check if the next character is valid; if not, set the session as finished
            if (!newExpectedCharacter) {
                if (!isTypingFinished) {
                    setIsTypingFinished(true);
                }
                return nextIndex - 1;
            }

            const newExpectedCharacterKeyObj = findKeyObjInLayout(newExpectedCharacter, layout);

            // updates Words Per Minute (WPM) based on the typing progress
            updateWpm({ currentCharacterIndex, time, timeLeft, setWpm });
            setExpectedCharacter(newExpectedCharacter);
            setExpectedCharacterKeyObj(newExpectedCharacterKeyObj);

            // updates the hand and finger information for the next character.
            updateHandFingerInfoObj(newExpectedCharacterKeyObj, newExpectedCharacter, setHandFingerInfoObj);

            return nextIndex;
        },
        [text, layout, currentCharacterIndex, time, timeLeft, setWpm, isTypingFinished, setIsTypingFinished]
    );

    // handles key press events and checks if the pressed key matches the expected character
    const onKeyPress = useCallback(
        (lastKeyPressed: string) => {
            if (!lastKeyPressed || isTypingFinished) return;

            setCurrentPressedKey(lastKeyPressed);

            // check if the typed key is correct
            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => prevIndex + 1);
            } else {
                setMistakeCount((prev) => prev + 1);
            }
        },
        [isTypingFinished, expectedCharacter, setMistakeCount]
    );

    useEffect(() => {
        // updates typing progress and processes the next character.
        updateTypingProgress(currentCharacterIndex, text.length, setpercentageOfTextTyped);
        processNextCharacter(currentCharacterIndex);
    }, [currentCharacterIndex, processNextCharacter, setpercentageOfTextTyped, text.length]);

    useEffect(() => {
        if (!text) return;

        // initializes state for the first character when the session starts
        const initialKeyObj = findKeyObjInLayout(text[0], layout);
        if (!initialKeyObj) return;

        setExpectedCharacterKeyObj(initialKeyObj);
        setExpectedCharacter(text[0]);

        // set hand and finger information for the first character
        if (initialKeyObj.hand && initialKeyObj.finger) {
            setHandFingerInfoObj({
                hand: initialKeyObj.hand,
                finger: initialKeyObj.finger,
                isShift: isUpperCaseLatvian(text[0]),
                isAlt: isLatvianSpecial(text[0]),
            });
        }
    }, [layout, text]);

    // reset all states when typing is finished
    useEffect(() => {
        if (isTypingFinished) {
            resetTypingState({
                setCurrentCharacterIndex,
                setExpectedCharacter,
                setCurrentPressedKey,
                setHandFingerInfoObj,
                setMistakeCount,
                setExpectedCharacterKeyObj,
                text,
            });
        }
    }, [isTypingFinished, setMistakeCount, text]);

    return {
        onKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        currentPressedKey,
        handFingerInfoObj,
        expectedCharacterKeyObj,
    };
};
export default useTypingSession;
