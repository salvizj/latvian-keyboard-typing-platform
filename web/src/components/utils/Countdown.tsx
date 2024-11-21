import React, { useEffect, useState } from 'react';

type CountdownProps = {
    time: number; // in seconds
    setFinished: (finished: boolean) => void;
    finished: boolean;
};

const Countdown: React.FC<CountdownProps> = ({ time, setFinished, finished }) => {
    const [timeLeft, setTimeLeft] = useState<number>(time);

    const [targetTime] = useState<number>(new Date().getTime() + time * 1000);

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the remaining time by subtracting current time from target
            const remainingTime = Math.max(0, Math.floor((targetTime - new Date().getTime()) / 1000));
            setTimeLeft(remainingTime);

            // Stop the interval when countdown reaches zero
            if (remainingTime <= 0 || finished) {
                setFinished(true);
                clearInterval(interval);
            }
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [time, setFinished, finished, targetTime]);

    return <div className="flex justify-center items-center primary-text text-3xl ">{timeLeft}s</div>;
};

export default Countdown;
