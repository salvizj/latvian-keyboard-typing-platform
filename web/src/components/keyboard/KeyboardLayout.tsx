import React from 'react';
import { KeyObj } from '../../types';
import KeyboardKey from './Key';
import { getLayout } from '../../utils/layout';
import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';

type KeyboardLayoutProps = {
    expectedCharacter: string;
    expectedCharacterKeyObj: KeyObj;
};

const KeyboardLayout: React.FC<KeyboardLayoutProps> = ({ expectedCharacter, expectedCharacterKeyObj }) => {
    const { keyboardLayout } = useKeyboardSettings();
    const layout = getLayout(keyboardLayout);

    return (
        <div className=" flex flex-col items-center gap-2 p-6 bg-color-third rounded-md max-w-full min-w-[46rem]  max-h-full flex-grow mx-4">
            {layout.map((keyObjRow, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex w-full gap-2 justify-center">
                    {keyObjRow.map((keyObj: KeyObj) => (
                        <KeyboardKey
                            key={`${keyObj.key}-${keyObj.hand}`}
                            keyObj={keyObj}
                            expectedCharacter={expectedCharacter}
                            expecteCharacterKeyObj={expectedCharacterKeyObj}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KeyboardLayout;
