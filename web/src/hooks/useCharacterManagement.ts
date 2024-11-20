import { useCallback, useEffect, useState } from 'react';
import { HandFingerInfo, KeyObj } from '../types';
import { getKeyObjByKey } from '../utils/getKeyObjByKey';
import {
    isLatvianSpecial,
    isUpperCaseLatvian,
} from '../utils/testCharacterToLatvian';

export const useKeyPressManagement = (
    text: string,
    setFinished: (finished: boolean) => void,
    finished: boolean
) => {
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

    // reset all states because lessons or race or test has ended
    useEffect(() => {
        setCurrentCharacterIndex(0);
        setExpectedCharacter(text[0]);
        setCurrentPressedKey('');
        setHandFingerInfo(null);
        setExpectedCharacterKeyObj(null);
    }, [finished, text]);

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
    }, [text, finished]);

    const handleKeyPress = useCallback(
        (lastKeyPressed: string) => {
            setCurrentPressedKey(lastKeyPressed);

            if (lastKeyPressed === expectedCharacter) {
                setCurrentCharacterIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;

                    if (nextIndex < text.length) {
                        const newExpectedCharacter = text[nextIndex];
                        const expectedCharacterKeyObj =
                            getKeyObjByKey(newExpectedCharacter);
                        setExpectedCharacter(newExpectedCharacter);
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
                    } else setFinished(true);

                    return nextIndex;
                });
            }
        },
        [text, expectedCharacter, setFinished]
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
