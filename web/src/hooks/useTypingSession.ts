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
    const { setProcentsOfTextTyped, isTypingFinished, setIsTypingFinished, setMistakeCount, setWpm } = useTyping();
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);

    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] = useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(null);
    const [handFingerInfo, setHandFingerInfo] = useState<HandFingerInfo | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    // for typing race only
    const handleTypingProgress = (nextIndex: number) => {
        setProcentsOfTextTyped?.((nextIndex / text.length) * 100);
    };

    const updateHandFingerInfo = (keyObj: KeyObj, character: string) => {
        if (keyObj.hand && keyObj.finger) {
            setHandFingerInfo({
                hand: keyObj.hand,
                finger: keyObj.finger,
                isShift: isUpperCaseLatvian(character),
                isAlt: isLatvianSpecial(character),
            });
        } else {
            setHandFingerInfo(null);
        }
    };

    // gets next character from text with nextIndex and finds keyObj
    const processNextCharacter = (nextIndex: number): number => {
        // check if typing is finished
        const newExpectedCharacter = text[nextIndex];

        if (!newExpectedCharacter) {
            if (!isTypingFinished) {
                setIsTypingFinished(true);
            }
            return nextIndex - 1;
        }

        const newExpectedCharacterKeyObj = findKeyObjInLayout({
            targetKey: newExpectedCharacter,
            layout,
        });

        if (!newExpectedCharacterKeyObj) {
            return nextIndex - 1;
        }

        setExpectedCharacter(newExpectedCharacter);
        setExpectedCharacterKeyObj(newExpectedCharacterKeyObj);
        updateHandFingerInfo(newExpectedCharacterKeyObj, newExpectedCharacter);

        return nextIndex;
    };

    // pass this to input field
    const onKeyPress = useCallback(
        (lastKeyPressed: string) => {
            if (!lastKeyPressed || isTypingFinished) return;

            setCurrentPressedKey(lastKeyPressed);

            // check if the typed key is correct
            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    return nextIndex;
                });
            } else {
                setMistakeCount((prev) => prev + 1);
            }

            const calculatedWpm = calculateWpm({ currentCharacterIndex, startTime });
            setWpm(calculatedWpm);
        },
        [isTypingFinished, expectedCharacter, startTime, currentCharacterIndex]
    );

    useEffect(() => {
        // after component renders to set time
        if (currentCharacterIndex === 0) setStartTime(Date.now());
        handleTypingProgress(currentCharacterIndex);
        processNextCharacter(currentCharacterIndex);
    }, [currentCharacterIndex]);

    useEffect(() => {
        if (!text) return;

        // directly initialize the first character
        const initialKeyObj = findKeyObjInLayout({ targetKey: text[0], layout });
        if (!initialKeyObj) return;

        setExpectedCharacterKeyObj(initialKeyObj);
        setExpectedCharacter(text[0]);

        if (initialKeyObj.hand && initialKeyObj.finger) {
            setHandFingerInfo({
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
            setCurrentCharacterIndex(0);
            setExpectedCharacter(text[0] || '');
            setCurrentPressedKey('');
            setHandFingerInfo(null);
            setMistakeCount(0);
            setExpectedCharacterKeyObj(null);
        }
    }, [isTypingFinished, text]);

    // return value
    return {
        onKeyPress,
        expectedCharacter,
        currentCharacterIndex,
        currentPressedKey,
        handFingerInfo,
        expectedCharacterKeyObj,
    };
};
