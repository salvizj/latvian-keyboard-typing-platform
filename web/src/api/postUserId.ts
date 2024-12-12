import axios from 'axios';

const postUserId = (userId: string): Promise<string> => {
    return axios
        .post(`/api/post-user-id`, {
            userId,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error posting user Id:', error);
            throw error;
        });
};

export default postUserId;
