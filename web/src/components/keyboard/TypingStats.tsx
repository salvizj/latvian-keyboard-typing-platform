import { useEffect, useState } from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import { useTyping } from '../../context/TypingContext';

type TypingStatsProps = {
    start: boolean;
};

const TypingStats: React.FC<TypingStatsProps> = ({ start }) => {
    const { language } = useLanguage();
    const { wpm, mistakeCount, isTypingFinished, percentageOfTextTyped } = useTyping();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (start && !isTypingFinished) {
            setShow(true);
        }
    }, [start, isTypingFinished]);

    if (!start || isTypingFinished) {
        return null;
    }

    return (
        show && (
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
                <div>
                    <p className="mb-1">
                        {translate('percentage_of_text_typed', language)}: {percentageOfTextTyped} {'%'}
                    </p>
                </div>
            </div>
        )
    );
};

export default TypingStats;
