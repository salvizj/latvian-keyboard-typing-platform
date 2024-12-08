import { useEffect, useState } from 'react';
import postGameRecord from '../api/postGameRecord';
import { useParams } from 'react-router-dom';
import useAuthStatus from './useAuthStatus';

const usePostGameRecord = (gameRecord: number, isGameOver: boolean) => {
    const [gameRecordPostError, setGameRecordPostError] = useState<string | null>(null);
    const [gameRecordPostLoading, setGameRecordPostLoading] = useState<boolean>(false);
    const { userId } = useAuthStatus();
    const { gameOption } = useParams<{ gameOption: string }>();

    useEffect(() => {
        if (userId && gameOption && gameRecord !== null && isGameOver) {
            setGameRecordPostLoading(true);
            postGameRecord(gameOption, userId, gameRecord)
                .then(() => {
                    setGameRecordPostError(null);
                    setGameRecordPostLoading(false);
                })
                .catch(() => {
                    setGameRecordPostError('error_posting_game_record');
                    setGameRecordPostLoading(false);
                });
        }
    }, [userId, gameOption, gameRecord, isGameOver]);

    return { gameRecordPostError, gameRecordPostLoading };
};
export default usePostGameRecord;
