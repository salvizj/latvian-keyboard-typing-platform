import { Hand, KeyObj } from '../../types';
import {
    isLatvianSpecial,
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
    const isNextKeyLatvianSpecial = isLatvianSpecial(expectedCharacter);

    // here we need to find shift and Alt keys
    const isCurrentKeyShift = keyObj.key === 'Shift';
    const isCurrentKeyAlt = keyObj.key === 'Alt';
    const isCurrentKeyLeft = keyObj.hand === ('left' as Hand | undefined);

    // Function to get the classes
    const getKeyClasses = () => {
        const classes = [
            keyObj.size || '',
            isNextKey ? 'next-key' : '',
            shouldHighlightShift() ? 'shift-key' : '',
            shouldHighlightAlt() ? 'alt-key' : '',
        ];

        return classes.filter(Boolean).join(' ');
    };

    // Function to check if the Shift key should be highlighted
    const shouldHighlightShift = (): boolean => {
        if (!isCurrentKeyShift) return false;

        // for uppercase characters, highlight the opposite hand's Shift key
        if (isNextKeyUpperCase) {
            return isNextKeyLeftHand ? !isCurrentKeyLeft : isCurrentKeyLeft;
        }

        return false;
    };

    // Function to check if the Alt key should be highlighted
    const shouldHighlightAlt = (): boolean => {
        if (!isCurrentKeyAlt) return false;

        // for Latvian special characters, only highlight the right Alt key
        if (isNextKeyLatvianSpecial) {
            return !isCurrentKeyLeft;
        }

        return false;
    };

    return (
        <div
            className={
                getKeyClasses() +
                ' flex items-center justify-center rounded-sm border keyboard-border primary-text tracking-wide min-h-[40px] max-h-[100px]'
            }
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
