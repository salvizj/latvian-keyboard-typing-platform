export const stringToNumber = (value: string): number => {
    const result = Number(value);

    // Return 0 if conversion fails
    return isNaN(result) ? 0 : result;
};
