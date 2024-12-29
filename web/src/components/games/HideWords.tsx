import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTyping } from '../../context/TypingContext';
import translate from '../../utils/translate';
import CompletionScreen from '../utils/CompletionScreen';
import Countdown from '../utils/Countdown';
import TypinginputField from '../keyboard/TypingInputField';
import usePostGameRecord from '../../hooks/usePostGameRecord';
import TypingTextDisplay from '../keyboard/TypingTextDisplay';

type HideWordsProps = {
    latvianWords: string[];
    userId: string | null;
};

const HideWords: React.FC<HideWordsProps> = ({ latvianWords, userId }) => {
    // game constants
    const TYPING_TIME = 10;
    const INITIAL_SHOW_TIME = 5;
    const MIN_SHOW_TIME = 2;
    const SHOW_TIME_DECREASE_RATE = 0.5;

    const { gameOption } = useParams<{ gameOption: string }>();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { setTime, timeLeft, time, setText } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();

    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [typingTime, setTypingTime] = useState(TYPING_TIME);
    const [round, setRound] = useState(0);
    const [showText, setShowText] = useState(true);
    const [showTime, setShowTime] = useState(INITIAL_SHOW_TIME);
    const [isGameOver, setIsGameOver] = useState(false);
    const [shouldStartTimer, setShouldStartTimer] = useState(true);

    const hasWords = Array.isArray(latvianWords) && latvianWords.length > 0;
    const [currentWord, setCurrentWord] = useState(hasWords ? latvianWords[0] : '');

    const { gameRecordPostError } = usePostGameRecord(gameOption, round, isGameOver, userId);

    const resetRound = useCallback(() => {
        const nextRound = round + 1;
        const nextWord = hasWords ? latvianWords[nextRound] : '';
        const nextShowTime = Math.max(MIN_SHOW_TIME, showTime - SHOW_TIME_DECREASE_RATE);

        setIsTypingFinished(false);
        setShouldStartTimer(false);
        setCurrentWord(nextWord);
        setCurrentLetterIndex(0);
        setTypingTime(TYPING_TIME);
        setShowTime(nextShowTime);
        setText(nextWord);
        setShowText(true);

        setTimeout(() => setShouldStartTimer(true), 0);
    }, [setIsTypingFinished, hasWords, latvianWords, round, showTime, setText]);

    const handleKeyPress = useCallback(
        (lastKeyPress: string) => {
            if (isGameOver) return;

            if (lastKeyPress === currentWord[currentLetterIndex]) {
                const nextIndex = currentLetterIndex + 1;

                if (nextIndex === currentWord.length) {
                    setRound((prev) => prev + 1);
                    resetRound();
                } else {
                    setCurrentLetterIndex(nextIndex);
                }
            }
        },
        [currentWord, currentLetterIndex, isGameOver, resetRound]
    );

    useEffect(() => {
        // initialize game
        setTime(TYPING_TIME);
        setText(currentWord);

        if (hasWords && round >= latvianWords.length) {
            setIsGameOver(true);
        }

        if (isTypingFinished) {
            setIsGameOver(true);
        }

        if (typingTime !== time) {
            setTime(typingTime);
        }

        if (timeLeft != null) {
            setShowText(timeLeft > TYPING_TIME - showTime);
        }

        return () => setIsTypingFinished(false);
    }, [
        setTime,
        setText,
        currentWord,
        hasWords,
        round,
        latvianWords.length,
        isTypingFinished,
        typingTime,
        time,
        timeLeft,
        showTime,
        setIsTypingFinished,
    ]);

    const completionTitle = `${translate('game_over_you_held_up', language)} ${round} ${translate(
        round === 1 ? 'round' : 'rounds',
        language
    )}`;

    if (isGameOver) {
        return (
            <CompletionScreen
                title={completionTitle}
                showMetrics={false}
                error={gameRecordPostError}
                buttons={[
                    {
                        text: 'home',
                        onClick: () => navigate('/'),
                    },
                    {
                        text: 'restart',
                        onClick: () => location.reload(),
                    },
                ]}
            />
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-xl text-center text-color-primary p-4">
                {translate('round', language)} {round}
            </div>
            <Countdown start={shouldStartTimer} />

            {currentWord && showText && <TypingTextDisplay currentCorrectTextCharacterIndex={currentLetterIndex} />}

            <TypinginputField
                onKeyPress={handleKeyPress}
                isTypingFinished={isGameOver}
                labelText="type_word_that_shows_above"
            />
        </div>
    );
};

export default HideWords;
