import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { WritersText } from '../../types';
import translate from '../../utils/translate';
import useGetWritersTexts from '../../hooks/useGetWritersTexts';

const TextSelectionSection: React.FC<{
    isCustomText: boolean;
    setIsCustomText: (isCustom: boolean) => void;
    customText: string;
    setCustomText: (text: string) => void;
    selectedText: string;
    setSelectedText: (text: string) => void;
    setTextid: (textid: number) => void;
    setText: (text: string) => void;
    setTextType: (textType: 'writers' | 'custom') => void;
}> = ({
    isCustomText,
    setIsCustomText,
    customText,
    setCustomText,
    selectedText,
    setSelectedText,
    setText,
    setTextid,
    setTextType,
}) => {
    const { language } = useLanguage();
    const { writersTexts, writersTextsError } = useGetWritersTexts();
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (isCustomText) {
            setText(customText);
            setCustomText(customText);
            setTextType('custom');
        } else {
            setText(selectedText);
            setTextType('writers');
        }
    }, [isCustomText, customText, selectedText, setText, setCustomText, setTextType]);

    return (
        <div className="flex flex-col gap-4 mb-2 ms:gap-4">
            <label className="text-left">{translate('select_text_option', language)}</label>

            {writersTexts && (
                <div className="flex gap-4 flex-col sm:flex-row justify-start">
                    <button
                        className={`py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary ${!isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                        onClick={() => setIsCustomText(false)}
                    >
                        {translate('pick_text', language)}
                    </button>
                    <button
                        className={`py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary ${isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                        onClick={() => setIsCustomText(true)}
                    >
                        {translate('custom_text', language)}
                    </button>
                </div>
            )}

            {writersTextsError && (
                <p className="text-red-500 mt-2">{translate('writers_text_not_available', language)}</p>
            )}
            {!writersTexts && <p className="text-red-500 mt-2">{translate('writers_text_not_available', language)}</p>}

            <div className="mt-2">
                {isCustomText || !writersTexts ? (
                    <textarea
                        className="w-full p-4 mb-2 border rounded-md resize-none text-color-third bg-color-primary placeholder-color-third"
                        maxLength={1000}
                        rows={4}
                        placeholder={translate('enter_custom_text', language)}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                    />
                ) : (
                    <select
                        className="w-full p-4 mb-2 border rounded-md text-color-third bg-color-primary"
                        value={displayValue}
                        onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            const content = selectedOption.getAttribute('data-content');
                            const key = selectedOption.getAttribute('data-key');

                            setDisplayValue(e.target.value);
                            setSelectedText(content || '');
                            if (content) setSelectedText(content);
                            if (key) setTextid(Number(key));
                        }}
                    >
                        <option value="" disabled>
                            {translate('pick_text', language)}
                        </option>
                        {Array.isArray(writersTexts) &&
                            writersTexts.map((text: WritersText) => (
                                <option
                                    key={text.writersTextId}
                                    data-key={text.writersTextId}
                                    data-content={text.fragmentsContent}
                                    value={`${text.writersFirstName} ${text.writersLastName} - ${text.fragmentName}`}
                                >
                                    {text.writersFirstName} {text.writersLastName} - {text.fragmentName}
                                </option>
                            ))}
                    </select>
                )}
            </div>
        </div>
    );
};
export default TextSelectionSection;
