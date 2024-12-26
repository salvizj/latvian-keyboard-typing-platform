import React from 'react';
import { KeyObj } from '../../types';
import KeyboardKey from './Key';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import { getLayout } from '../../utils/getLayout';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type KeyboardLayoutProps = {
    expectedCharacterKeyObj: KeyObj | null;
    expectedCharacter: string;
};

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ expectedCharacterKeyObj, expectedCharacter }) => {
    const { language } = useLanguage();
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);

    if (layout === null) {
        return (
            <p className="text-lg text-red-500 flex justify-center items-center h-full">
                {translate('error_layout_not_found', language)}
            </p>
        );
    }
    if (expectedCharacterKeyObj === null || expectedCharacterKeyObj === undefined) {
        return (
            <p className="text-lg text-red-500 flex justify-center items-center h-full">
                {translate('error_expected_character_key_obj_not_found', language)}
            </p>
        );
    }

    return (
        <div className=" flex flex-col items-center justify-center gap-2 p-6 bg-color-third rounded-md w-[46rem]">
            {layout.map((keyObjRow, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex gap-2 justify-center">
                    {keyObjRow.map((keyObj: KeyObj) => (
                        <KeyboardKey
                            key={`${keyObj.key}-${keyObj.hand}`}
                            keyObj={keyObj}
                            expecteCharacterKeyObj={expectedCharacterKeyObj}
                            expectedCharacter={expectedCharacter}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KeyboardLayout;
