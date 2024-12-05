export const updateTypingProgress = (
    currentIndex: number,
    totalLength: number,
    setProcentsOfTextTyped?: (progress: number) => void
): void => {
    const progress = (currentIndex / totalLength) * 100;
    setProcentsOfTextTyped?.(progress);
};
