import axios from 'axios';

const getTypingTestsAndRacesCount = (
    userId: string,
    dateFrom: string,
    dateTill: string
): Promise<{ testsCount: number; racesCount: number }> => {
    return axios
        .get<{ testsCount: number; racesCount: number }>('/api/get-typing-tests-and-races-count', {
            params: { userId, dateFrom, dateTill },
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching typing tests and races count:', error);
            throw error;
        });
};

export default getTypingTestsAndRacesCount;
