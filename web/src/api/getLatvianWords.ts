import axios from 'axios';

const getLatvianWords = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`/api/latvian-words`);
        return response.data;
    } catch (error) {
        console.error('Error fetching latvian words:', error);
        throw error;
    }
};

export default getLatvianWords;
