import React from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type RealTimeTypingPerformanceProps = {
    wpm?: number;
    mistakesCount: number;
};

const RealTimeTypingPerformance: React.FC<RealTimeTypingPerformanceProps> = ({ wpm, mistakesCount }) => {
    const { language } = useLanguage();

    return (
        <div className="flex justify-between items-center text-xl primary-text bg-transparent p-2 gap-4 ">
            <div>
                <p className="mb-1">
                    {translate('wpm', language)}: {wpm}
                </p>
            </div>
            <div>
                <p className="mb-1">
                    {translate('mistakes', language)}: {mistakesCount}
                </p>
            </div>
        </div>
    );
};

export default RealTimeTypingPerformance;
