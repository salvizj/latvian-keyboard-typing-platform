import { useEffect, useState } from 'react';
import getGameRecord from '../api/getGameRecord';

export const useGetGameRecord = (userId: string, gameName: string) => {
    const [gameRecord, setGameRecord] = useState<number | null>(null);
    const [gameRecordError, setGameRecordError] = useState<string | null>(null);

    useEffect(() => {
        getGameRecord(gameName, userId)
            .then((data) => {
                setGameRecord(data);
                setGameRecordError(null);
            })
            .catch(() => {
                setGameRecordError('Error fetching game record');
                setGameRecord(null);
            });
    }, [userId, gameName]);

    return { gameRecord, gameRecordError };
};
