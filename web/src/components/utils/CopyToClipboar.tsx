import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type CopyToClipboardProps = {
    text: string;
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);
    const { language } = useLanguage();

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div>
            <button
                onClick={handleCopy}
                className="border border-text-color-primary flex items-center px-4 py-2 rounded hover:text-color-primary-hover-text"
            >
                {isCopied ? (
                    <>
                        <FiCheck className="mr-2 text-green-500" />
                        {translate('copied', language)}
                    </>
                ) : (
                    <>
                        <FiCopy className="mr-2 text-gray-500" />
                        {translate('copy_to_clipboard', language)}
                    </>
                )}
            </button>
        </div>
    );
};

export default CopyToClipboard;
