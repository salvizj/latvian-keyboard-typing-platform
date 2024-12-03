import { KeyboardLayouts, KeyObj } from '../types';
import { DVORAK_LAYOUT, QWERTY_LAYOUT } from './layouts';

const layouts: Record<KeyboardLayouts, KeyObj[][]> = {
    [KeyboardLayouts.Qwerty]: QWERTY_LAYOUT,
    [KeyboardLayouts.Dvorak]: DVORAK_LAYOUT,
};

export function getLayout(layout: KeyboardLayouts): KeyObj[][] | null {
    return layouts[layout] || null;
}
