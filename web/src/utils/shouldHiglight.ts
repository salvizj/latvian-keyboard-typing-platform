import { Finger, Hand, HandFingerInfo } from '../types';

export const shouldHighlight = (handFingerInfo: HandFingerInfo, targetHand: Hand, targetFinger: Finger): boolean => {
    const { hand, finger, isShift, isAlt } = handFingerInfo;

    if (hand === targetHand && finger === targetFinger) {
        return true;
    }
    // when shift is required and typing letters hand is left we light up right hands thumb
    if (isShift && hand === Hand.Left && targetHand === Hand.Right && targetFinger === Finger.Pinky) return true;

    // when shift is required and typing letters hand is right we light up left hands thumb
    if (isShift && hand === Hand.Right && targetHand === Hand.Left && targetFinger === Finger.Pinky) return true;

    // when alt is required light up only right hands thumb
    if (isAlt && targetHand === Hand.Right && targetFinger == Finger.Thumb) {
        return true;
    }

    return false;
};
