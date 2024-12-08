import axios from 'axios';

const postGameRecord = (gameName: string, userId: string, gameRecord: number): Promise<number> => {
    return axios
        .post<number>('/api/post-game-record', {
            gameName,
            userId,
            gameRecord,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error posting game record', error);
            throw error;
        });
};
export default postGameRecord;
