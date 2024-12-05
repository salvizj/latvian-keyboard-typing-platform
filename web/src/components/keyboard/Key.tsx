import { Hand, KeyObj } from '../../types';
import { isLatvianSpecial, isUpperCaseLatvian } from '../../utils/latvian-utils';

type KeyboardKeyProps = {
    keyObj: KeyObj;
    expectedCharacter: string;
    expecteCharacterKeyObj: KeyObj;
};

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ keyObj, expectedCharacter, expecteCharacterKeyObj }) => {
    // to find nextKey properties
    const isNextKey = keyObj === expecteCharacterKeyObj;
    const isNextKeyLeftHand = expecteCharacterKeyObj.hand === Hand.Left;
    const isNextKeyUpperCase = isUpperCaseLatvian(expectedCharacter);
    const isNextKeyLatvianSpecial = isLatvianSpecial(expectedCharacter);

    // here we need to find shift and Alt keys whele iterating through keys
    const isCurrentKeyShift = keyObj.key === 'Shift';
    const isCurrentKeyAlt = keyObj.key === 'Alt';
    const isCurrentKeyLeft = keyObj.hand === ('left' as Hand | undefined);

    // add higliht clases
    // function to check if the Shift key should be highlighted
    const shouldHighlightShiftKey = (): boolean => {
        if (!isCurrentKeyShift) return false;

        // for uppercase characters, highlight the opposite hand's Shift key
        if (isNextKeyUpperCase) {
            return isNextKeyLeftHand ? !isCurrentKeyLeft : isCurrentKeyLeft;
        }

        return false;
    };

    // function to check if the Alt key should be highlighted
    const shouldHighlightAltKey = (): boolean => {
        if (!isCurrentKeyAlt) return false;

        // for Latvian special characters, only highlight the right Alt key
        if (isNextKeyLatvianSpecial) {
            return !isCurrentKeyLeft;
        }

        return false;
    };

    const getKeyClasses = () => {
        const classes = [
            keyObj.width,
            isNextKey ? 'next-key' : '',
            shouldHighlightShiftKey() ? 'shift-key' : '',
            shouldHighlightAltKey() ? 'alt-key' : '',
        ];
        console.log(keyObj.width);

        return classes.filter(Boolean).join(' ');
    };

    return (
        <div
            className={`${getKeyClasses()} flex justify-center items-center rounded-md border keyboard-border text-color-primary tracking-wide h-10`}
        >
            <span>{keyObj.label}</span>
            {keyObj.altLabel && <span className="text-xs text-gray-500">{keyObj.altLabel}</span>}
        </div>
    );
};

export default KeyboardKey;
