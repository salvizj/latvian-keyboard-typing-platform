import { useEffect, useState, useRef } from 'react';
import { TypingTest, TypingTestSettings } from '../types';
import postTypingTest from '../api/postTypingTest';
import { useTyping } from '../context/TypingContext';
import { useOptions } from '../context/OptionsContext';
import useAuthStatus from './useAuthStatus';
import useGetPoetTexts from './useGetPoetTexts';

const usePostTypingTest = () => {
    const { userId } = useAuthStatus();
    const { isTypingFinished, wpm, mistakeCount } = useTyping();
    const { time, isCustomText, customText, selectedTextId } = useOptions();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const { poetTexts } = useGetPoetTexts();

    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (!userId) return;
        if (isTypingFinished && userId && !hasSubmitted.current) {
            hasSubmitted.current = true;

            const typingTestSettings: TypingTestSettings = {
                typingTestSettingsId: null,
                textType: isCustomText ? 'custom' : 'poet',
                customText: isCustomText ? customText : null,
                textId: selectedTextId,
                time: time,
            };

            const typingTestData: TypingTest = {
                userId: userId,
                typingTestSettingsId: typingTestSettings.typingTestSettingsId,
                wpm: wpm,
                mistakeCount: mistakeCount,
                date: new Date().toISOString().split('T')[0],
            };

            const submitTypingTest = () => {
                setError(null);

                postTypingTest(typingTestData, typingTestSettings)
                    .then(() => {
                        setSuccess(true);
                    })
                    .catch(() => {
                        setError('error_failed_to_save_typing_test');
                    });
            };

            submitTypingTest();
        }
    }, [isTypingFinished, userId, isCustomText, customText, poetTexts, time, wpm, mistakeCount, selectedTextId]);

    return { success, error };
};
export default usePostTypingTest;
