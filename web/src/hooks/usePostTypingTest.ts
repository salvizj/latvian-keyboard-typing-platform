import { useEffect, useState, useRef } from 'react';
import { TypingTest, PoetText, TypingTestSettings } from '../types';
import postTypingTest from '../api/postTypingTest';
import { useAuthStatus } from './useAuthStatus';
import { useTyping } from '../context/TypingContext';
import { useOptions } from '../context/OptionsContext';

export const usePostTypingTest = () => {
    const { userId } = useAuthStatus();
    const { isTypingFinished, wpm, mistakeCount } = useTyping();
    const { time, isCustomText, customText, poetTexts } = useOptions();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const hasSubmitted = useRef(false);

    const getTextId = (textType: string, poetTexts: PoetText[], customText: string | null): number | null => {
        if (textType === 'poet') {
            const matchedPoetText = poetTexts.find((poetText) => poetText.poetText === customText);
            return matchedPoetText ? matchedPoetText.poetTextId : null;
        }
        return null;
    };

    useEffect(() => {
        if (!userId) return;
        if (isTypingFinished && userId && !hasSubmitted.current) {
            hasSubmitted.current = true;

            const textId = getTextId(isCustomText ? 'custom' : 'poet', poetTexts, customText);

            const typingTestSettings: TypingTestSettings = {
                typingTestSettingsId: null,
                textType: isCustomText ? 'custom' : 'poet',
                customText: isCustomText ? customText : null,
                textId: textId,
                time: time,
            };

            const typingTestData: TypingTest = {
                userId: userId,
                typingTestSettingsId: typingTestSettings.typingTestSettingsId,
                wpm: wpm,
                mistakeCount: mistakeCount,
                date: new Date().toISOString().split('T')[0],
            };

            const submitTypingTest = async () => {
                try {
                    setError(null);
                    await postTypingTest(typingTestData, typingTestSettings);
                    setSuccess(true);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    setError('error_failed_to_save_typing_test');
                }
            };

            submitTypingTest();
        }
    }, [isTypingFinished, userId, isCustomText, customText, poetTexts, time, wpm, mistakeCount]);

    return { success, error };
};
