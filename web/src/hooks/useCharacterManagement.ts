import { useCallback, useEffect, useState } from 'react';
import { HandFingerInfo, KeyObj } from '../types';
import { getKeyObjByKey } from '../utils/getKeyObjByKey';
import {
    isLatvianSpecial,
    isUpperCaseLatvian,
} from '../utils/testCharacterToLatvian';

export const useKeyPressManagement = (text: string) => {
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [expectedCharacter, setExpectedCharacter] = useState(text[0]);
    const [expectedCharacterKeyObj, setExpectedCharacterKeyObj] =
        useState<KeyObj | null>(null);
    const [currentPressedKey, setCurrentPressedKey] = useState<string | null>(
        null
    );
    const [handFingerInfo, setHandFingerInfo] = useState<HandFingerInfo | null>(
        null
    );

    // this is for first character because we need to get keyObj and we usually get keyOby after key press
    useEffect(() => {
        const initialKeyObj = getKeyObjByKey(text[0]);
        setExpectedCharacterKeyObj(initialKeyObj);
        if (initialKeyObj?.hand && initialKeyObj?.finger) {
            setHandFingerInfo({
                hand: initialKeyObj.hand,
                finger: initialKeyObj.finger,
                isShift: isUpperCaseLatvian(text[0]),
                isAlt: isLatvianSpecial(text[0]),
            });
        }
    }, [text]);

    const handleKeyPress = useCallback(
        (lastKeyPressed: string) => {
            setCurrentPressedKey(lastKeyPressed);

            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex < text.length) {
                        const newExpectedCharacter = text[nextIndex];
                        setExpectedCharacter(newExpectedCharacter);

                        const expectedCharacterKeyObj =
                            getKeyObjByKey(newExpectedCharacter);
                        setExpectedCharacterKeyObj(expectedCharacterKeyObj);
                        if (
                            expectedCharacterKeyObj?.hand &&
                            expectedCharacterKeyObj?.finger
                        ) {
                            setHandFingerInfo({
                                hand: expectedCharacterKeyObj.hand,
                                finger: expectedCharacterKeyObj.finger,
                                isShift:
                                    isUpperCaseLatvian(newExpectedCharacter),
                                isAlt: isLatvianSpecial(newExpectedCharacter),
                            });
                        } else {
                            setHandFingerInfo(null);
                        }
                    }

                    return nextIndex;
                });
            }
        },
        [text, expectedCharacter]
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
