import axios from 'axios';

const getLatvianWords = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`/api/get-latvian-words`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latvian words:', error);
        throw error;
    }
};

export default getLatvianWords;
