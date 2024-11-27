import React, { useEffect, useState } from 'react';
import { useOptions } from '../../context/OptionsContext';
import { useTyping } from '../../context/TypingContext';

type CountdownProps = {
    timeLeft: number;
    setTimeLeft: (time: number) => void;
};

const Countdown: React.FC<CountdownProps> = ({ timeLeft, setTimeLeft }) => {
    const { time } = useOptions();
    const { isTypingFinished, setIsTypingFinished } = useTyping();
    const [targetTime] = useState<number>(new Date().getTime() + time * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            const remainingTime = Math.max(0, Math.floor((targetTime - new Date().getTime()) / 1000));
            setTimeLeft(remainingTime);

            if (remainingTime <= 0 || isTypingFinished) {
                setIsTypingFinished(true);
                setTimeLeft(0);
                clearInterval(interval);
            }
        }, 1000);

        // cleanup interval on unmount
        return () => clearInterval(interval);
    }, [time, isTypingFinished, targetTime, setTimeLeft, timeLeft, setIsTypingFinished]);

    return <div className="flex justify-center items-center text-color-primary text-3xl">{timeLeft}</div>;
};

export default Countdown;
