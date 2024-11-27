import { KeyObj } from '../types';

export type FindKeyObjInLayoutParams = {
    targetKey: string;
    layout: KeyObj[][];
};

// finds the KeyObj by key from the given layout
export const findKeyObjInLayout = ({ targetKey, layout }: FindKeyObjInLayoutParams): KeyObj | null => {
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
