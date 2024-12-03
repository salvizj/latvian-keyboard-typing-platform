import React from 'react';
import { KeyObj } from '../../types';
import KeyboardKey from './Key';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import { getLayout } from '../../utils/getLayout';
import { capitalize } from '../../utils/capitalizeString';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type KeyboardLayoutProps = {
    expectedCharacterKeyObj: KeyObj;
};

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ expectedCharacterKeyObj }) => {
    const { language } = useLanguage();
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);
    if (layout === null) {
        return (
            <p className="text-lg text-red-500 flex justify-center items-center h-full">
                {capitalize(translate('error_layout_not_found', language))}
            </p>
        );
    }
    if (expectedCharacterKeyObj === null || expectedCharacterKeyObj === undefined) {
        return (
            <p className="text-lg text-red-500 flex justify-center items-center h-full">
                {capitalize(translate('error_expected_character_key_obj_not_found', language))}
            </p>
        );
    }

    return (
        <div className=" flex flex-col items-center gap-2 p-6 bg-color-third rounded-md max-w-full min-w-[46rem]  max-h-full flex-grow mx-4">
            {layout.map((keyObjRow, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex w-full gap-2 justify-center">
                    {keyObjRow.map((keyObj: KeyObj) => (
                        <KeyboardKey
                            key={`${keyObj.key}-${keyObj.hand}`}
                            keyObj={keyObj}
                            expecteCharacterKeyObj={expectedCharacterKeyObj}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KeyboardLayout;
