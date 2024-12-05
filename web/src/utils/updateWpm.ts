type UpdateWpmParams = {
    currentCharacterIndex: number;
    time: number | null;
    timeLeft: number | null;
    setWpm: (value: number) => void;
};

export const updateWpm = ({ currentCharacterIndex, time, timeLeft, setWpm }: UpdateWpmParams): void => {
    if (!time || !timeLeft || timeLeft === time) {
        setWpm(0);
        return;
    }

    const timeElapsedMinutes = (time - timeLeft) / 60;
    const typedWords = currentCharacterIndex / 5;
    const wpm = Math.round(typedWords / timeElapsedMinutes);

    setWpm(wpm);
};
