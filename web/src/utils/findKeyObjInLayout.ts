import { KeyObj } from '../types';

// finds the KeyObj by key from the given layout
export const findKeyObjInLayout = (targetKey: string, layout: KeyObj[][] | null): KeyObj | null => {
    const normalizedTargetKey = targetKey.toLowerCase();

    // Check for invalid layout or targetKey
    if (!targetKey || layout === null) {
        return null;
    }

    // loop through each row in the layout
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
