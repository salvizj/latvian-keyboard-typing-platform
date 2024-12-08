import axios from 'axios';

const getLatvianWords = (): Promise<string[]> => {
    return axios
        .get<string[]>(`/api/get-latvian-words`)
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error fetching latvian words:', error);
            throw error;
        });
};

export default getLatvianWords;
