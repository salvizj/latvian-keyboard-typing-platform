import { useEffect, useState } from 'react';
import postGameRecord from '../api/postGameRecord';

const usePostGameRecord = (
    gameOption: string | undefined,
    gameRecord: number,
    isGameOver: boolean,
    userId: string | null
) => {
    const [gameRecordPostError, setGameRecordPostError] = useState<string | null>(null);
    const [gameRecordPostLoading, setGameRecordPostLoading] = useState<boolean>(false);
    useEffect(() => {
        if (userId && gameOption && gameOption != '' && gameRecord !== null && isGameOver) {
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
    }, [userId, gameRecord, isGameOver, gameOption]);

    return { gameRecordPostError, gameRecordPostLoading };
};
export default usePostGameRecord;
