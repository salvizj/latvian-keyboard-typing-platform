import { KeyboardLayouts, KeyObj } from '../types';
import { DVORAK_LAYOUT, QWERTY_LAYOUT } from './layouts';

export function getLayout(layout: KeyboardLayouts): KeyObj[][] {
    switch (layout.toLowerCase()) {
        case 'qwerty':
            return QWERTY_LAYOUT;
        case 'dvorak':
            return DVORAK_LAYOUT;
        default:
            throw new Error(`Unsupported layout: ${layout}`);
    }
}
