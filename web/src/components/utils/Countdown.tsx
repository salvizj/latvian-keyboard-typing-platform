import React, { useEffect } from 'react';
import { useOptions } from '../../context/OptionsContext';
import { useTyping } from '../../context/TypingContext';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type CountdownProps = {
    start: boolean;
};

const Countdown: React.FC<CountdownProps> = ({ start }) => {
    const { time, setTimeLeft, timeLeft } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();
    const { language } = useLanguage();

    useEffect(() => {
        if (start && time !== null) {
            const targetTime = new Date().getTime() + time * 1000;
            const interval = setInterval(() => {
                const remainingTime = Math.max(0, Math.floor((targetTime - new Date().getTime()) / 1000));
                setTimeLeft(remainingTime);
                if (remainingTime <= 0 || isTypingFinished) {
                    setIsTypingFinished(true);
                    setTimeLeft(0);
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [start, time, isTypingFinished, setTimeLeft, setIsTypingFinished]);

    return (
        <>
            {timeLeft != 0 && (
                <div className="flex justify-center items-center text-color-primary text-3xl">
                    {translate('time_left', language)} {timeLeft}
                </div>
            )}
        </>
    );
};

export default Countdown;
