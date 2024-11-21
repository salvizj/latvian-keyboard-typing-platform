import { LessonCompletionData } from '../types';

export const markLessonComplete = (lessonId: number) => {
    const storedData: LessonCompletionData = JSON.parse(localStorage.getItem('lessonCompletion') || '{}');

    storedData[lessonId] = {
        lessonId,
        completed: true,
        completedDate: new Date().toISOString(),
    };

    localStorage.setItem('lessonCompletion', JSON.stringify(storedData));
};

export const isLessonComplete = (lessonId: number): boolean => {
    const storedData: LessonCompletionData = JSON.parse(localStorage.getItem('lessonCompletion') || '{}');

    return storedData[lessonId]?.completed ?? false;
};

export const getLessonsCompleteObj = (): LessonCompletionData => {
    const storedData = localStorage.getItem('lessonCompletion');

    return storedData ? JSON.parse(storedData) : {};
};
