import { v4 as uuidv4 } from 'uuid';
import { TestCompletionData, TestCompletionObj } from '../types';

export const markTestComplete = (wpm: number, mistakeCount: number, text: string, time: number) => {
    const storedData: TestCompletionData = JSON.parse(localStorage.getItem('typingTestCompletion') || '{}');

    const typingTestCompletionId = uuidv4();

    const newCompletion: TestCompletionObj = {
        wpm,
        mistakeCount,
        text,
        time,
        completedDate: new Date(),
    };

    // store the new typingTestCompletion in the data with the UUID key
    storedData[typingTestCompletionId] = newCompletion;

    localStorage.setItem('typingTestCompletion', JSON.stringify(storedData));
};

export const getTestCompleteObj = (): TestCompletionData => {
    const storedData = localStorage.getItem('typingTestCompletion');
    return storedData ? JSON.parse(storedData) : {};
};
