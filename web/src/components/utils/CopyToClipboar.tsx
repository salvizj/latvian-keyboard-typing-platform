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
        if (navigator.clipboard) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                })
                .catch(() => {
                    fallbackCopyToClipboard(text);
                });
        } else {
            fallbackCopyToClipboard(text);
        }
    };

    const fallbackCopyToClipboard = (text: string) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(textarea);

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
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
                        <FiCopy className="mr-2 text-color-secondary" />
                        {translate('copy_to_clipboard', language)}
                    </>
                )}
            </button>
        </div>
    );
};

export default CopyToClipboard;
