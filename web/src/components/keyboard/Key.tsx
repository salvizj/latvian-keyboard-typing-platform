import { Hand, KeyObj } from '../../types';
import {
    isLongVowelLatvian,
    isUpperCaseLatvian,
} from '../../utils/testCharacterToLatvian';

type KeyProps = {
    keyObj: KeyObj;
    expectedCharacter: string;
    expecteCharacterKeyObj: KeyObj;
};

const Key: React.FC<KeyProps> = ({
    keyObj,
    expectedCharacter,
    expecteCharacterKeyObj,
}) => {
    const isNextKey = keyObj === expecteCharacterKeyObj;
    const isNextKeyLeftHand = expecteCharacterKeyObj.hand === Hand.Left;
    const isNextKeyUpperCase = isUpperCaseLatvian(expectedCharacter);
    const isNextKeyLongVowel = isLongVowelLatvian(expectedCharacter);

    // here we need to find shift and Alt keys
    const isCurrentKeyShift = keyObj.key === 'Shift';
    const isCurrentKeyAlt = keyObj.key === 'Alt';
    const isCurrentKeyLeft = keyObj.hand === ('left' as Hand | undefined);

    const shouldHighlightShift = (): boolean => {
        if (!isCurrentKeyShift) return false;

        // For uppercase characters, highlight the opposite hand's Shift key
        if (isNextKeyUpperCase) {
            return isNextKeyLeftHand ? !isCurrentKeyLeft : isCurrentKeyLeft;
        }

        return false;
    };

    const shouldHighlightAlt = (): boolean => {
        if (!isCurrentKeyAlt) return false;

        // For long vowels, only highlight the right Alt key
        if (isNextKeyLongVowel) {
            return !isCurrentKeyLeft;
        }

        return false;
    };

    return (
        <div
            className={`flex items-center justify-center rounded-sm border keyboard-border primary-text tracking-wide min-h-[40px] max-h-[100px] 
                ${keyObj.size || ''}
                ${isNextKey ? 'next-key' : ''}
                ${shouldHighlightShift() ? 'shift-key' : ''}
                ${shouldHighlightAlt() ? 'alt-key' : ''}
            `
                .trim()
                .replace(/\s+/g, ' ')}
        >
            <div className="flex flex-col items-center">
                <span>{keyObj.label}</span>
                {keyObj.altLabel && (
                    <span className="text-xs text-gray-500">
                        {keyObj.altLabel}
                    </span>
                )}
            </div>
        </div>
    );
};
export default Key;
