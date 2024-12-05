import { isUpperCaseLatvian, isLatvianSpecial } from './latvian-utils';
import { HandFingerInfoObj, KeyObj } from '../types';

export const updateHandFingerInfoObj = (
    keyObj: KeyObj | null,
    character: string,
    setHandFingerInfoObj: (value: HandFingerInfoObj | null) => void
): void => {
    if (keyObj) {
        if (keyObj.hand && keyObj.finger) {
            setHandFingerInfoObj({
                hand: keyObj.hand,
                finger: keyObj.finger,
                isShift: isUpperCaseLatvian(character),
                isAlt: isLatvianSpecial(character),
            });
        } else {
            setHandFingerInfoObj(null);
        }
    }
};
