import axios from 'axios';

const getTypingTestsAndRacesCount = async (userId: string): Promise<{ testsCount: number; racesCount: number }> => {
    try {
        const response = await axios.get<{ testsCount: number; racesCount: number }>(
            `/api/get-typing-tests-and-races-count?userId=${userId}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching typing tests and races count:', error);
        throw error;
    }
};

export default getTypingTestsAndRacesCount;
