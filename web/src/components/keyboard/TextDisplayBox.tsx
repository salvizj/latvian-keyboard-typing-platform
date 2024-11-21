import React from 'react';

type TextDisplayProps = {
    text: string;
    currentCorrectTextCharacterIndex: number;
};

const TextDisplayBox: React.FC<TextDisplayProps> = ({ text, currentCorrectTextCharacterIndex }) => {
    let globalIndex = 0;

    // split the text into words and process each word
    const processedText = text.split(' ').map((word, wordIndex, wordsArray) => {
        // process the letters in the word
        const wordLetters = word.split('').map((letter) => {
            const letterObject = {
                letter,
                globalIndex: globalIndex++,

                // determine if the letter has been typed
                hasBeenTyped: globalIndex <= currentCorrectTextCharacterIndex,
            };
            return letterObject;
        });

        // add a (·) at the end of the word, except for the last word
        if (wordIndex < wordsArray.length - 1) {
            wordLetters.push({
                letter: '·',
                globalIndex: globalIndex++,
                hasBeenTyped: globalIndex <= currentCorrectTextCharacterIndex,
            });
        }

        // determine if the word is fully typed (based on all its letters)
        const show = !wordLetters.every((letter) => letter.hasBeenTyped);

        return {
            wordLetters,
            show, // if all letters have been typed, show will be false, otherwise true
        };
    });

    return (
        <div className="flex justify-center items-center flex-wrap typing-text-box-bg border border-primary p-6 min-w-[46rem] max-w-[46rem] gap-1">
            {processedText.map(
                (wordObj, wordIndex) =>
                    // Display word if show is true
                    wordObj.show && (
                        <span key={wordIndex} className="flex flex-row justify-center items-center gap-1">
                            {wordObj.wordLetters.map((letterObj, letterIndex) => (
                                <span
                                    key={letterIndex}
                                    className={`${
                                        letterObj.hasBeenTyped ? 'typing-correct-text' : 'typing-color'
                                    } tracking-wide text-2xl `}
                                >
                                    {letterObj.letter}
                                </span>
                            ))}
                        </span>
                    )
            )}
        </div>
    );
};

export default TextDisplayBox;
