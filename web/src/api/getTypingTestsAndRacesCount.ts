import axios from 'axios';

const getTypingTestsAndRacesCount = (userId: string): Promise<{ testsCount: number; racesCount: number }> => {
    const url = `/api/get-typing-tests-and-races-count?userId=${userId}`;

    return axios
        .get<{ testsCount: number; racesCount: number }>(url)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching typing tests and races count:', error);
            throw error;
        });
};

export default getTypingTestsAndRacesCount;
