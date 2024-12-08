import { useEffect, useState } from 'react';
import getGameRecord from '../api/getGameRecord';
import useAuthStatus from './useAuthStatus';

const useGetGameRecord = (gameName: string) => {
    const [gameRecord, setGameRecord] = useState<number | null>(null);
    const [gameRecordGetError, setGameRecordGetError] = useState<string | null>(null);
    const [gameNameGetLoading, setGameNameGetLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();

    useEffect(() => {
        if (userId && gameName !== '' && gameName) {
            setGameNameGetLoading(true);
            getGameRecord(gameName, userId)
                .then((data) => {
                    setGameRecord(data);
                    setGameRecordGetError(null);
                    setGameNameGetLoading(false);
                })
                .catch(() => {
                    setGameRecordGetError('error_fetching_game_record');
                    setGameRecord(null);
                    setGameNameGetLoading(false);
                });
        }
    }, [userId, gameName]);

    return { gameRecord, gameRecordGetError, gameNameGetLoading };
};
export default useGetGameRecord;
