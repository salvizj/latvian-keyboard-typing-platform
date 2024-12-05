import axios from 'axios';
import { TypingTest, TypingTestSettings } from '../types';

const postTypingTest = async (typingTest: TypingTest, typingTestSettings: TypingTestSettings): Promise<TypingTest> => {
    try {
        const response = await axios.post<TypingTest>(`/api/post-typing-test`, {
            typingTest,
            typingTestSettings,
        });
        return response.data;
    } catch (error) {
        console.error('Error posting typing test:', error);
        throw error;
    }
};

export default postTypingTest;
