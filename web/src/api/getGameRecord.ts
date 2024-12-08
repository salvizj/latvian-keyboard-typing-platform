import axios from 'axios';

const getGameRecord = async (gameName: string, userId: string): Promise<number> => {
    try {
        const response = await axios.get<number>('/api/get-game-record', {
            params: { gameName, userId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching game record', error);
        throw error;
    }
};

export default getGameRecord;
