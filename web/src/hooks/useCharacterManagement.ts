import { useCallback, useEffect, useState } from 'react';
import { HandFingerInfo, KeyObj } from '../types';
import { getKeyObjByKey } from '../utils/getKeyObjByKey';
import { isLatvianSpecial, isUpperCaseLatvian } from '../utils/testCharacterToLatvian';

export type KeyPressError = 'EMPTY_TEXT' | 'INVALID_TEXT_TYPE' | 'INITIALIZATION_FAILED' | 'KEY_PROCESSING_ERROR';

export const useKeyPressManagement = (text: string, setFinished: (finished: boolean) => void, finished: boolean) => {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] = useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(null);
    const [handFingerInfo, setHandFingerInfo] = useState<HandFingerInfo | null>(null);

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

    // this is for first character because we need to get keyObj and we usually get keyObj after key press
    useEffect(() => {
        // Validate text first
        if (!validateText(text)) return;

        try {
            const initialKeyObj = getKeyObjByKey(text[0]);

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
    }, [text, validateText]);

    // reset all states because lessons or race or test has ended
    useEffect(() => {
        if (finished) {
            setCurrentCharacterIndex(0);
            setExpectedCharacter(text[0] || '');
            setCurrentPressedKey('');
            setHandFingerInfo(null);
            setExpectedCharacterKeyObj(null);
        }
    }, [finished, text]);

    const handleKeyPress = useCallback(
        (lastKeyPressed: string) => {
            if (!lastKeyPressed || finished) return;

            // Prevent processing if we've reached the end of the text
            if (currentCharacterIndex >= text.length) {
                setFinished(true);
                return;
            }

            try {
                setCurrentPressedKey(lastKeyPressed);

                if (lastKeyPressed === expectedCharacter) {
                    setCurrentCharacterIndex((prevIndex) => {
                        const nextIndex = prevIndex + 1;

                        if (nextIndex < text.length) {
                            const newExpectedCharacter = text[nextIndex];

                            if (!newExpectedCharacter) {
                                setFinished(true);
                                return prevIndex;
                            }

                            const newExpectedCharacterKeyObj = getKeyObjByKey(newExpectedCharacter);

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
                            setFinished(true);
                        }

                        return nextIndex;
                    });
                }
            } catch (err) {
                console.error('Key processing error:', err);
            }
        },
        [text, expectedCharacter, finished, currentCharacterIndex, setFinished]
    );

    return {
        handleKeyPress,
        currentCharacterIndex,
        expectedCharacter,
        currentPressedKey,
        handFingerInfo,
        expectedCharacterKeyObj,
        isCompleted: currentCharacterIndex >= text.length,
    };
};
