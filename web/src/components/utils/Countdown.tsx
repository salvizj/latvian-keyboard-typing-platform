import React, { useEffect, useState } from 'react';
import { useOptions } from '../../context/OptionsContext';
import { useTyping } from '../../context/TypingContext';

type CountdownProps = {
    start: boolean;
};

const Countdown: React.FC<CountdownProps> = ({ start }) => {
    const { time, setTimeLeft, timeLeft } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();

    // ensure time is not null before calculating targetTime
    const [targetTime, setTargetTime] = useState<number | null>(null);

    useEffect(() => {
        if (time !== null) {
            setTargetTime(new Date().getTime() + time * 1000);
        }
    }, [time]);

    useEffect(() => {
        if (start && targetTime !== null) {
            const interval = setInterval(() => {
                const remainingTime = Math.max(0, Math.floor((targetTime - new Date().getTime()) / 1000));
                setTimeLeft(remainingTime);

                if (remainingTime <= 0 || isTypingFinished) {
                    setIsTypingFinished(true);
                    setTimeLeft(0);
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [start, targetTime, isTypingFinished, setTimeLeft, setIsTypingFinished]);

    return (
        <>
            {timeLeft != 0 && (
                <div className="flex justify-center items-center text-color-primary text-3xl">{timeLeft}</div>
            )}
        </>
    );
};

export default Countdown;
