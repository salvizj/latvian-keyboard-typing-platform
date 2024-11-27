import { useCallback, useEffect, useState } from 'react';
import { HandFingerInfo, KeyObj } from '../types';
import { isLatvianSpecial, isUpperCaseLatvian } from '../utils/latvian-utils';
import { useKeyboardSettings } from '../context/KeyboardSettingsContext';
import { findKeyObjInLayout } from '../utils/findKeyObjInLayout';
import { calculateWpm } from '../utils/calculateWpm';
import { getLayout } from '../utils/getLayout';
import { useOptions } from '../context/OptionsContext';
import { useTyping } from '../context/TypingContext';

export const useTypingSession = () => {
    const { text } = useOptions();
    const { mistakeCount, setProcentsOfTextTyped, isTypingFinished, setIsTypingFinished, setMistakeCount, setWpm } =
        useTyping();
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] = useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(null);
    const [handFingerInfo, setHandFingerInfo] = useState<HandFingerInfo | null>(null);
    const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
    const { keyboardLayout } = useKeyboardSettings();

    const layout = getLayout(keyboardLayout);

    // validation function to check input text
    const validateText = useCallback((inputText: string): boolean => {
        if (!inputText) {
            return false;
        }

        if (typeof inputText !== 'string') {
            return false;
        }

        return true;
    }, []);

    useEffect(() => {
        if (currentCharacterIndex === 0 && startTimestamp === null) {
            setStartTimestamp(Date.now());
        }
    }, [currentCharacterIndex, startTimestamp]);

    // this is for first character because we need to get keyObj and we usually get keyObj after key press
    useEffect(() => {
        // Validate text first
        if (!validateText(text)) return;

        try {
            const initialKeyObj = findKeyObjInLayout(text[0], layout);

            if (!initialKeyObj) {
                return;
            }

            setExpectedCharacterKeyObj(initialKeyObj);
            setExpectedCharacter(text[0]);

            if (initialKeyObj?.hand && initialKeyObj?.finger) {
                setHandFingerInfo({
                    hand: initialKeyObj.hand,
                    finger: initialKeyObj.finger,
                    isShift: isUpperCaseLatvian(text[0]),
                    isAlt: isLatvianSpecial(text[0]),
                });
            }
        } catch (err) {
            console.error('Initialization error:', err);
        }
    }, [layout, text, validateText]);

    // reset all states because lessons or race or test has ended
    useEffect(() => {
        if (isTypingFinished) {
            setCurrentCharacterIndex(0);
            setExpectedCharacter(text[0] || '');
            setCurrentPressedKey('');
            setHandFingerInfo(null);
            setMistakeCount(0);
            setExpectedCharacterKeyObj(null);
        }
    }, [isTypingFinished, setMistakeCount, text]);

    const onKeyPress = useCallback(
        (lastKeyPressed: string) => {
            if (!lastKeyPressed || isTypingFinished) return;

            // Prevent processing if we've reached the end of the text
            if (currentCharacterIndex >= text.length) {
                setIsTypingFinished(true);
                return;
            }

            setCurrentPressedKey(lastKeyPressed);

            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;

                    // we calculate here % of typed text
                    if (setProcentsOfTextTyped) {
                        setProcentsOfTextTyped((nextIndex / text.length) * 100);
                    }

                    if (nextIndex < text.length) {
                        const newExpectedCharacter = text[nextIndex];

                        if (!newExpectedCharacter) {
                            setIsTypingFinished(true);
                            return prevIndex;
                        }

                        const newExpectedCharacterKeyObj = findKeyObjInLayout(newExpectedCharacter, layout);

                        if (!newExpectedCharacterKeyObj) {
                            return prevIndex;
                        }

                        setExpectedCharacter(newExpectedCharacter);
                        setExpectedCharacterKeyObj(newExpectedCharacterKeyObj);

                        if (newExpectedCharacterKeyObj?.hand && newExpectedCharacterKeyObj?.finger) {
                            setHandFingerInfo({
                                hand: newExpectedCharacterKeyObj.hand,
                                finger: newExpectedCharacterKeyObj.finger,
                                isShift: isUpperCaseLatvian(newExpectedCharacter),
                                isAlt: isLatvianSpecial(newExpectedCharacter),
                            });
                        } else {
                            setHandFingerInfo(null);
                        }
                    } else {
                        setIsTypingFinished(true);
                    }

                    return nextIndex;
                });
            } else {
                setMistakeCount(mistakeCount + 1);
            }
            const calculatedWpm = calculateWpm(currentCharacterIndex, startTimestamp);
            setWpm(calculatedWpm);
        },
        [
            isTypingFinished,
            currentCharacterIndex,
            text,
            expectedCharacter,
            startTimestamp,
            setWpm,
            setIsTypingFinished,
            setProcentsOfTextTyped,
            layout,
            setMistakeCount,
            mistakeCount,
        ]
    );

    return {
        onKeyPress,
        currentCharacterIndex,
        expectedCharacter,
        currentPressedKey,
        handFingerInfo,
        expectedCharacterKeyObj,
        isCompleted: currentCharacterIndex >= text.length,
    };
};
