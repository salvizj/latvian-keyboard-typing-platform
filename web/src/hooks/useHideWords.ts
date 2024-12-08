import { useState, useEffect, useCallback } from 'react';
import { useOptions } from '../context/OptionsContext';
import { useTyping } from '../context/TypingContext';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';

type GameState = {
    round: number;
    currentLetterIndex: number;
    showTextTime: number;
    isGameOver: boolean;
};

export const useHideWords = (words: string[]) => {
    const TYPING_TIME = 10;
    const { language } = useLanguage();
    const { setTime, timeLeft, setTimeLeft } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();

    const [gameState, setGameState] = useState<GameState>({
        round: 0,
        currentLetterIndex: 0,
        showTextTime: 5,
        isGameOver: false,
    });

    // check if we have words available
    const hasWords = Array.isArray(words) && words.length > 0;
    let currentWord = hasWords ? words[gameState.round] : '';

    // set game over if we run out of words
    useEffect(() => {
        if (hasWords && gameState.round >= words.length) {
            setGameState((prev) => ({
                ...prev,
                isGameOver: true,
            }));
        }
    }, [gameState.round, hasWords, words]);

    // initial set
    useEffect(() => {
        setTime(TYPING_TIME);
        setTimeLeft(TYPING_TIME);
    }, [setTime, setTimeLeft]);

    // reset time
    useEffect(() => {
        if (isTypingFinished && !gameState.isGameOver) {
            setTime(TYPING_TIME);
            setTimeLeft(TYPING_TIME);
        }
    }, [isTypingFinished, gameState.isGameOver, setTimeLeft, setTime]);

    currentWord = words[gameState.round] || '';

    const completionTitle = `${translate('game_over_you_held_up', language)} ${gameState.round} ${translate('rounds', language)}`;

    const handleKeyPress = useCallback(
        (lastKeyPress: string) => {
            if (gameState.isGameOver) return;

            if (lastKeyPress === currentWord[gameState.currentLetterIndex]) {
                const nextIndex = gameState.currentLetterIndex + 1;

                if (nextIndex === currentWord.length) {
                    setIsTypingFinished(true);
                } else {
                    setGameState((prev) => ({
                        ...prev,
                        currentLetterIndex: nextIndex,
                    }));
                }
            }
        },
        [currentWord, gameState.currentLetterIndex, gameState.isGameOver, setIsTypingFinished]
    );

    // round completion logic
    useEffect(() => {
        if (isTypingFinished && !gameState.isGameOver) {
            setGameState((prev) => ({
                ...prev,
                round: prev.round + 1,
                currentLetterIndex: 0,
                showTextTime: Math.max(0.2, prev.showTextTime - prev.round * 0.1),
            }));
            setIsTypingFinished(false);
            setTimeLeft(TYPING_TIME);
        }
    }, [gameState.isGameOver, isTypingFinished, setIsTypingFinished, setTimeLeft]);

    // countdown timer logic
    useEffect(() => {
        if (timeLeft != null) {
            if (gameState.showTextTime > 0 && timeLeft > 0 && !gameState.isGameOver) {
                const timer = setTimeout(() => {
                    setGameState((prev) => ({
                        ...prev,
                        showTextTime: prev.showTextTime - 1,
                    }));
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [gameState.showTextTime, timeLeft, gameState.isGameOver]);

    // game over logic
    useEffect(() => {
        if (timeLeft === 0 && !gameState.isGameOver) {
            setGameState((prev) => ({
                ...prev,
                isGameOver: true,
            }));
        }
    }, [timeLeft, gameState.isGameOver]);

    return {
        timeLeft,
        gameState,
        setTimeLeft: setTimeLeft,
        handleKeyPress,
        completionTitle,
        hasWords,
        currentWord,
        isTypingFinished,
    };
};
