import { useEffect, useState } from 'react';
import getGameRecord from '../api/getGameRecord';
import useAuthStatus from './useAuthStatus';

const useGetGameRecord = (gameName: string) => {
    const [gameRecord, setGameRecord] = useState<number | null>(null);
    const [gameRecordGetError, setGameRecordGetError] = useState<string | null>(null);
    const [gameRecordGetLoading, setGameRecordGetLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();

    useEffect(() => {
        if (userId && gameName !== '' && gameName && gameRecord !== null) {
            setGameRecordGetLoading(true);
            getGameRecord(gameName, userId)
                .then((data) => {
                    setGameRecord(data);
                    setGameRecordGetError(null);
                    setGameRecordGetLoading(false);
                })
                .catch(() => {
                    setGameRecordGetError('error_fetching_game_record');
                    setGameRecord(null);
                    setGameRecordGetLoading(false);
                });
        }
    }, [userId, gameName]);

    return { gameRecord, gameRecordGetError, gameRecordGetLoading };
};
export default useGetGameRecord;
