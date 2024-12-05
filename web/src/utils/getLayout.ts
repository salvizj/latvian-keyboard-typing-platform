import { KeyboardLayouts, KeyObj } from '../types';
import { DVORAK_LAYOUT, QWERTY_LAYOUT } from './layouts.json';

const layouts: Record<KeyboardLayouts, KeyObj[][]> = {
    [KeyboardLayouts.Qwerty]: QWERTY_LAYOUT as unknown as KeyObj[][],
    [KeyboardLayouts.Dvorak]: DVORAK_LAYOUT as unknown as KeyObj[][],
};

export function getLayout(layout: KeyboardLayouts): KeyObj[][] | null {
    return layouts[layout] || null;
}
