export const markLessonComplete = (lessonId: number) => {
    const storedData = JSON.parse(
        localStorage.getItem('lessonCompletion') || '{}'
    );

    storedData[lessonId] = {
        completed: true,
        completedDate: new Date().toISOString(),
    };

    localStorage.setItem('lessonCompletion', JSON.stringify(storedData));
};

export const isLessonComplete = (lessonId: number): boolean => {
    const storedData = JSON.parse(
        localStorage.getItem('lessonCompletion') || '{}'
    );

    return storedData[lessonId]?.completed ?? false;
};
