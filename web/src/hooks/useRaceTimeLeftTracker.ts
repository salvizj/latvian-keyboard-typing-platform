import { useEffect } from 'react';
import { WebSocketMessage, WebSocketMessageData, WebSocketMessageType } from '../types';
import { useOptions } from '../context/OptionsContext';

type useRaceTimeLeftTrackerParams = {
    lastMessage: WebSocketMessage<WebSocketMessageData> | null;
};

const useRaceTimeLeftTracker = ({ lastMessage }: useRaceTimeLeftTrackerParams) => {
    const { setTimeLeft } = useOptions();

    useEffect(() => {
        if (!lastMessage || lastMessage.type !== WebSocketMessageType.TimeLeft) {
            return;
        }

        const timeLeftData = lastMessage.data as { timeLeft: number };
        setTimeLeft(timeLeftData.timeLeft);
    }, [lastMessage, setTimeLeft]);

    return null;
};

export default useRaceTimeLeftTracker;
