export const isUpperCaseLatvian = (character: string) => {
    return /^[A-ZĀČĒĢĪĶĻŅÓŪŽ]$/.test(character);
};
export const isLongVowelLatvian = (character: string) => {
    return /^[ēūīāĒŪĪĀ]$/.test(character);
};
