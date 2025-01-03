import { HandFingerInfoObj, KeyObj } from '../types';

type ResetTypingStateParams = {
    setCurrentCharacterIndex: (value: number) => void;
    setExpectedCharacter: (value: string) => void;
    setCurrentPressedKey: (value: string | null) => void;
    setHandFingerInfoObj: (value: HandFingerInfoObj | null) => void;
    setMistakeCount: (value: number) => void;
    setExpectedCharacterKeyObj: (value: KeyObj | null) => void;
    text: string;
};
export const resetTypingState = ({
    setCurrentCharacterIndex,
    setExpectedCharacter,
    setCurrentPressedKey,
    setHandFingerInfoObj,
    setMistakeCount,
    setExpectedCharacterKeyObj,
    text,
}: ResetTypingStateParams) => {
    setCurrentCharacterIndex(0);
    setExpectedCharacter(text[0] || '');
    setCurrentPressedKey('');
    setHandFingerInfoObj(null);
    setMistakeCount(0);
    setExpectedCharacterKeyObj(null);
};
