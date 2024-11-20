import React from 'react';
import { KeyObj } from '../../types';
import { keyObjRows } from '../../utils/keyObjRows';
import Key from './Key';

type VirtualKeyboardProps = {
    expectedCharacter: string;
    expectedCharacterKeyObj: KeyObj;
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
    expectedCharacter,
    expectedCharacterKeyObj,
}) => {
    return (
        <div className=" flex flex-col items-center gap-2 p-6 third-bg rounded-md max-w-full min-w-[46rem] mx-auto max-h-full">
            {keyObjRows.map((keyObjRow, rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    className="flex w-full gap-2 justify-center"
                >
                    {keyObjRow.map((keyObj: KeyObj) => (
                        <Key
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

export default VirtualKeyboard;
