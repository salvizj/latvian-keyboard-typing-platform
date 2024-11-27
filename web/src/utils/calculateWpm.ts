type CalculateWpmParams = {
    currentCharacterIndex: number;
    startTime: number | null;
};

export const calculateWpm = ({ currentCharacterIndex, startTime }: CalculateWpmParams): number => {
    if (!startTime) return 0;

    // convert milliseconds to minutes
    const timeGoneBy = (Date.now() - startTime) / 60000;

    // I assume average word length is 5 characters
    const typedWords = currentCharacterIndex / 5;

    const wordsPerMinute = Math.round(typedWords / timeGoneBy);

    return wordsPerMinute;
};
