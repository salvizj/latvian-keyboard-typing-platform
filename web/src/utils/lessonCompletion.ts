import { v4 as uuidv4 } from 'uuid';
import { LessonCompletionData, LessonCompletionObj } from '../types';

export const completeLesson = (lessonId: number) => {
    const storedData: LessonCompletionData = JSON.parse(localStorage.getItem('lessonCompletion') || '{}');

    const lessonCompletionId = uuidv4();

    const newCompletion: LessonCompletionObj = {
        lessonId,
        completed: true,
        completedDate: new Date(),
    };
    storedData[lessonCompletionId] = newCompletion;

    localStorage.setItem('lessonCompletion', JSON.stringify(storedData));
};

export const hasLessonBeenCompleted = (lessonId: number): boolean => {
    const storedData: LessonCompletionData = JSON.parse(localStorage.getItem('lessonCompletion') || '{}');

    // check if any completion with the provided lessonId exists
    const lessonCompleted = Object.values(storedData).find((lesson) => lesson.lessonId === lessonId);

    return lessonCompleted ? lessonCompleted.completed : false;
};

export const getAllLessonCompletions = (): LessonCompletionData => {
    const storedData = localStorage.getItem('lessonCompletion');
    return storedData ? JSON.parse(storedData) : {};
};
