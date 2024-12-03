import { useEffect } from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import { useTyping } from '../../context/TypingContext';

type TypingStatsProps = {
    start: boolean;
};

const TypingStats: React.FC<TypingStatsProps> = ({ start }) => {
    const { language } = useLanguage();
    const { wpm, mistakeCount, isTypingFinished } = useTyping();

    useEffect(() => {
        if (start && !isTypingFinished) {
            // Add any logic to execute when typing starts
            console.log('Typing stats activated!');
        }
    }, [start, isTypingFinished]);

    if (!start || isTypingFinished) {
        return null;
    }

    return (
        <div className="flex justify-between items-center text-xl text-color-primary bg-transparent p-2 gap-4">
            <div>
                <p className="mb-1">
                    {translate('wpm', language)}: {wpm}
                </p>
            </div>
            <div>
                <p className="mb-1">
                    {translate('mistakes', language)}: {mistakeCount}
                </p>
            </div>
        </div>
    );
};

export default TypingStats;
