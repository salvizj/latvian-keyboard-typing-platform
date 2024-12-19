import React, { useEffect, useRef, useCallback } from 'react';
import { useOptions } from '../../context/OptionsContext';
import { useTyping } from '../../context/TypingContext';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type CountdownProps = {
    start: boolean;
};

const Countdown: React.FC<CountdownProps> = ({ start }) => {
    const { time, setTimeLeft, timeLeft } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();
    const { language } = useLanguage();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setTimeLeft(time);
        const targetTime = new Date().getTime() + time * 1000;

        intervalRef.current = setInterval(() => {
            const remainingTime = Math.max(0, Math.floor((targetTime - new Date().getTime()) / 1000));
            setTimeLeft(remainingTime);

            if (remainingTime <= 0 || isTypingFinished) {
                setIsTypingFinished(true);
                setTimeLeft(0);
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            }
        }, 100);
    }, [time, setTimeLeft, isTypingFinished, setIsTypingFinished]);

    useEffect(() => {
        if (start && time !== null) {
            startTimer();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [start, time, startTimer]);

    return (
        <>
            {timeLeft !== 0 && (
                <div className="flex justify-center items-center text-color-primary text-xl">
                    {translate('time_left', language)} {timeLeft}
                </div>
            )}
        </>
    );
};

export default Countdown;
