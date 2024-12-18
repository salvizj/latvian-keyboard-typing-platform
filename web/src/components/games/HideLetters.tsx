import { useState, useEffect, useCallback } from 'react';
import { useTyping } from '../../context/TypingContext';
import { useLanguage } from '../../context/LanguageContext';
import Countdown from '../utils/Countdown';
import translate from '../../utils/translate';
import TypinginputField from '../keyboard/TypingInputField';
import CompletionScreen from '../utils/CompletionScreen';
import { useNavigate, useParams } from 'react-router-dom';
import { useOptions } from '../../context/OptionsContext';
import usePostGameRecord from '../../hooks/usePostGameRecord';

type HideLettersProps = {
    userId: string | null;
};

const HideLetters: React.FC<HideLettersProps> = ({ userId }) => {
    const INITIAL_TYPING_TIME = 10;
    const LATVIAN_ALPHABET = 'aābcčdēģfģhīījķļmņņośšpēqrsšūžzAĀBCČDEĢFGHĪIJĶĻMNŅOŚŠPĒQRSŠŪŽZ';

    const { gameOption } = useParams<{ gameOption: string }>();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { isTypingFinished } = useTyping();
    const { setTime, time } = useOptions();

    const [currentLetter, setCurrentLetter] = useState(() => generateRandomLetter());
    const [typingTime, setTypingTime] = useState(INITIAL_TYPING_TIME);
    const [round, setRound] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [resetCountdown, setResetCountdown] = useState(false);

    const { gameRecordPostError } = usePostGameRecord(gameOption, round, isGameOver, userId);

    function generateRandomLetter() {
        const randomIndex = Math.floor(Math.random() * LATVIAN_ALPHABET.length);
        return LATVIAN_ALPHABET[randomIndex];
    }

    const resetRound = useCallback(() => {
        setResetCountdown(true);
        setCurrentLetter(generateRandomLetter());
        setTypingTime(INITIAL_TYPING_TIME);
    }, []);

    const handleKeyPress = useCallback(
        (key: string) => {
            if (isGameOver) return;

            if (key === currentLetter) {
                setRound((prev) => prev + 1);
                setTypingTime(INITIAL_TYPING_TIME);
                resetRound();
            }
        },
        [isGameOver, currentLetter, resetRound]
    );

    useEffect(() => {
        if (typingTime !== time) {
            setTime(typingTime);
        }
    }, [typingTime, setTime, time]);

    useEffect(() => {
        if (isTypingFinished) {
            setIsGameOver(true);
        }
    }, [isTypingFinished]);

    const completionTitle = `${translate('game_over_you_held_up', language)} ${round} ${translate(round === 1 ? 'round' : 'rounds', language)}`;

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
            <Countdown
                start={!isGameOver}
                reset={resetCountdown}
                setReset={setResetCountdown}
                key={resetCountdown ? 'reset' : 'start'}
            />
            {currentLetter && (
                <div className="flex justify-center items-center flex-wrap bg-color-third border border-primary p-6 min-w-[44rem] max-w-[44rem] gap-1">
                    <span className="flex flex-row justify-center items-center gap-1">
                        <span className="text-color-typing text-2xl">{currentLetter}</span>
                    </span>
                </div>
            )}
            <TypinginputField
                onKeyPress={handleKeyPress}
                isTypingFinished={isGameOver}
                labelText="type_word_that_shows_above"
            />
        </div>
    );
};

export default HideLetters;
