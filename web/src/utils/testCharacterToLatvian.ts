export const isUpperCaseLatvian = (character: string) => {
    return /^[A-ZĀČĒĢĪĶĻŅŪŽ]$/.test(character);
};

export const isLatvianSpecial = (character: string) => {
    return /^[āčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ]$/.test(character);
};
