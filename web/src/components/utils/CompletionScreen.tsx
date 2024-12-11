import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import DefaultPanel from './DefaultPanel';
import { MdClose } from 'react-icons/md';
import { useTyping } from '../../context/TypingContext';
import useAuthStatus from '../../hooks/useAuthStatus';

type ButtonProps = {
    text: string;
    onClick: () => void;
    styleClass?: string;
    customContent?: React.ReactNode;
};

type CompletionScreenProps = {
    title: string;
    buttons: ButtonProps[];
    error?: string | null;
    showMetrics?: boolean;
    place?: number;
};

const CompletionScreen: React.FC<CompletionScreenProps> = ({ title, buttons, error, showMetrics, place }) => {
    const { language } = useLanguage();
    const [close, setClose] = useState(false);
    const { wpm, mistakeCount, procentsOfTextTyped } = useTyping();
    const [tempWpm, setTempWpm] = useState<number>(0);
    const [tempMistakeCount, setTempMistakeCount] = useState<number>(0);
    const [tempProcentsOfTextTyped, setTempProcentsOfTextTyped] = useState<number>(0);
    const { userId } = useAuthStatus();
    useEffect(() => {
        if (!showMetrics) return;
        setTempWpm(wpm ?? 0);
        setTempMistakeCount(mistakeCount ?? 0);
        setTempProcentsOfTextTyped(procentsOfTextTyped ?? 0);
    }, [wpm, mistakeCount, showMetrics, procentsOfTextTyped, place]);

    return (
        <>
            {!close && (
                <DefaultPanel>
                    <h1 className="text-3xl font-bold mb-8 text-center">{translate(title, language)}</h1>

                    {showMetrics && (
                        <div className="text-center mb-6">
                            <p className="text-xl mb-2">
                                {translate('wpm', language)} {tempWpm ?? 0}
                            </p>
                            <p className="text-xl">
                                {translate('mistakes', language)} {tempMistakeCount ?? 0}
                            </p>
                            <p className="text-xl">
                                {translate('procents_of_text_typed', language)} {tempProcentsOfTextTyped ?? 0} {'%'}
                            </p>
                            <p className="text-xl">
                                {translate('place', language)} {place ?? 0} {'%'}
                            </p>
                        </div>
                    )}

                    {error && userId && (
                        <p className="text-sm text-red-500 flex justify-center items-center p-4">
                            {translate(error, language)}
                        </p>
                    )}

                    <div className="flex flex-row gap-4 items-center justify-center">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onClick}
                                className={`bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary${button.styleClass || ''}`}
                            >
                                {button.customContent || translate(button.text, language)}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setClose(true)}
                        className="absolute top-4 right-4 text-3xl hover:text-color-primary-hover-text"
                    >
                        <MdClose />
                    </button>
                </DefaultPanel>
            )}
        </>
    );
};

export default CompletionScreen;
