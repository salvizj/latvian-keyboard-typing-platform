import axios from 'axios';
import { TypingTest, TypingTestSettings } from '../types';

const postTypingTest = (typingTest: TypingTest, typingTestSettings: TypingTestSettings): Promise<TypingTest> => {
    return axios
        .post<TypingTest>(`/api/post-typing-test`, {
            typingTest,
            typingTestSettings,
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error posting typing test:', error);
            throw error;
        });
};

export default postTypingTest;
