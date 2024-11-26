import { KeyObj } from '../types';

// given KeyObj.key returns KeyObj from layout
export const getKeyObjByLayout = (targetKey: string, layout: KeyObj[][]): KeyObj | null => {
    const normalizedTargetKey = targetKey.toLowerCase();

    if (typeof targetKey !== 'string' || targetKey === undefined) {
        return null;
    }

    for (const row of layout) {
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
