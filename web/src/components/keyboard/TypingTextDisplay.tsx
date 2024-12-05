import React from 'react';
import { useOptions } from '../../context/OptionsContext';

type TextDisplayProps = {
    currentCorrectTextCharacterIndex: number;
};

const TypingTextDisplay: React.FC<TextDisplayProps> = ({ currentCorrectTextCharacterIndex }) => {
    const { text } = useOptions();
    const currentChunk = Math.floor(currentCorrectTextCharacterIndex / 120);
    const startIndex = currentChunk * 120;
    const displayText = text.slice(startIndex, startIndex + 120).replace(/ /g, '.');

    return (
        <div className="flex justify-center items-center flex-wrap bg-color-third border border-primary p-6 min-w-[46rem] max-w-[46rem] gap-1 overflow-hidden whitespace-normal break-words max-h-[200px]">
            {displayText.split('').map(
                (letter, index) =>
                    startIndex + index >= currentChunk * 120 && (
                        <span
                            key={index}
                            className={`${
                                startIndex + index < currentCorrectTextCharacterIndex
                                    ? 'text-color-typing-correct'
                                    : 'text-color-typing'
                            } tracking-wide text-2xl`}
                        >
                            {letter}
                        </span>
                    )
            )}
        </div>
    );
};

export default TypingTextDisplay;
