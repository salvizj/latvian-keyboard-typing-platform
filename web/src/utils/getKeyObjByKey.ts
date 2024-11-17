import { KeyObj } from '../types';
import { keyObjRows } from './keyObjRows';

// given KeyObj.key returns KeyObj from keyObjRows
export const getKeyObjByKey = (targetKey: string): KeyObj | null => {
    const normalizedTargetKey = targetKey.toLowerCase();

    for (const row of keyObjRows) {
        const keyObj = row.find(
            (key) =>
                key.key.toLowerCase() === normalizedTargetKey ||
                (key.altKey && key.altKey.toLowerCase() === normalizedTargetKey)
        );

        if (keyObj) {
            return keyObj;
        }
    }

    return null;
};
