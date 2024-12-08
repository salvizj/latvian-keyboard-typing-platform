import axios from 'axios';

const getGameRecord = (gameName: string, userId: string): Promise<number> => {
    return axios
        .get<number>('/api/get-game-record', {
            params: { gameName, userId },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching game record', error);
            throw error;
        });
};

export default getGameRecord;
