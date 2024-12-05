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

export const useTypingSession = () => {
    const { text, time, timeLeft } = useOptions();
    const { setProcentsOfTextTyped, isTypingFinished, setIsTypingFinished, setMistakeCount, setWpm } = useTyping();
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);

    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] = useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(null);
    const [handFingerInfoObj, setHandFingerInfoObj] = useState<HandFingerInfoObj | null>(null);

    // gets next character from text with nextIndex and finds keyObj
    const processNextCharacter = useCallback(
        (nextIndex: number): number => {
            const newExpectedCharacter = text[nextIndex];
            if (!newExpectedCharacter) {
                if (!isTypingFinished) {
                    setIsTypingFinished(true);
                }
                return nextIndex - 1;
            }

            const newExpectedCharacterKeyObj = findKeyObjInLayout(newExpectedCharacter, layout);

            if (!newExpectedCharacter) {
                setIsTypingFinished(true);
            }

            updateWpm({ currentCharacterIndex, time, timeLeft, setWpm });
            setExpectedCharacter(newExpectedCharacter);
            setExpectedCharacterKeyObj(newExpectedCharacterKeyObj);
            updateHandFingerInfoObj(newExpectedCharacterKeyObj, newExpectedCharacter, setHandFingerInfoObj);

            return nextIndex;
        },
        [text, layout, currentCharacterIndex, time, timeLeft, setWpm, isTypingFinished, setIsTypingFinished]
    );

    // pass this func to input field
    const onKeyPress = useCallback(
        (lastKeyPressed: string) => {
            if (!lastKeyPressed || isTypingFinished) return;

            setCurrentPressedKey(lastKeyPressed);

            // check if the typed key is correct
            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => {
                    return prevIndex + 1;
                });
            } else {
                setMistakeCount((prev) => prev + 1);
            }
        },
        [isTypingFinished, expectedCharacter, setMistakeCount]
    );

    useEffect(() => {
        updateTypingProgress(currentCharacterIndex, text.length, setProcentsOfTextTyped);
        processNextCharacter(currentCharacterIndex);
    }, [currentCharacterIndex, processNextCharacter, setProcentsOfTextTyped, text.length]);

    useEffect(() => {
        if (!text) return;

        // to set starting objects
        const initialKeyObj = findKeyObjInLayout(text[0], layout);
        if (!initialKeyObj) return;

        setExpectedCharacterKeyObj(initialKeyObj);
        setExpectedCharacter(text[0]);

        if (initialKeyObj.hand && initialKeyObj.finger) {
            setHandFingerInfoObj({
                hand: initialKeyObj.hand,
                finger: initialKeyObj.finger,
                isShift: isUpperCaseLatvian(text[0]),
                isAlt: isLatvianSpecial(text[0]),
            });
        }
    }, [layout, text]);

    // to reset values
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

    // return value
    return {
        onKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        currentPressedKey,
        handFingerInfoObj,
        expectedCharacterKeyObj,
    };
};
