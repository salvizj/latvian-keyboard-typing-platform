export enum Finger {
    Pinky = 'pinky',
    Ring = 'ring',
    Middle = 'middle',
    Index = 'index',
    Thumb = 'thumb',
}

export enum Hand {
    Left = 'left',
    Right = 'right',
}
export type KeyObj = {
    key: string;
    label: string;
    size: string;
    hand?: Hand;
    finger?: Finger;
    altKey?: string;
    altLabel?: string;
};

export type Lesson = {
    id: number;
    lessonType: string;
    lessonText: string;
};
export type HandFingerInfo = {
    hand: Hand;
    finger: Finger;
    isShift: boolean;
    isAlt: boolean;
};
export type LessonCompletionObj = {
    lessonId: number;
    completed: boolean;
    completedDate: string;
};

export type LessonCompletionData = Record<number, LessonCompletionObj>;

export type PoetText = {
    id: number;
    poetAuthor: string;
    poetFragmentName: string;
    poetText: string;
};
