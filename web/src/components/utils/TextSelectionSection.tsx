import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PoetText } from '../../types';
import { capitalize } from '../../utils/capitalizeString';
import translate from '../../utils/translate';

const TextSelectionSection: React.FC<{
    isCustomText: boolean;
    setIsCustomText: (isCustom: boolean) => void;
    customText: string;
    setCustomText: (text: string) => void;
    selectedText: string;
    setSelectedText: (text: string) => void;
    poetTexts: PoetText[];
    setText: (text: string) => void;
}> = ({
    isCustomText,
    setIsCustomText,
    customText,
    setCustomText,
    selectedText,
    setSelectedText,
    poetTexts,
    setText,
}) => {
    const { language } = useLanguage();

    useEffect(() => {
        if (isCustomText) {
            setText(customText.trim());
        } else {
            setText(selectedText);
        }
    }, [isCustomText, customText, selectedText, setText]);

    return (
        <div className="flex flex-col gap-4 mb-2">
            <label className="text-left">{translate('select_text_option', language)}:</label>
            <div className="flex gap-4 justify-start items-center">
                <button
                    className={` py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary ${!isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                    onClick={() => setIsCustomText(false)}
                >
                    {capitalize(translate('pick_text', language))}
                </button>
                <button
                    className={` py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary ${isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                    onClick={() => setIsCustomText(true)}
                >
                    {capitalize(translate('custom_text', language))}
                </button>
            </div>
            {isCustomText ? (
                <textarea
                    className="w-full p-4 border rounded-lg resize-none text-color-third bg-color-primary placeholder-color-third mb-2"
                    maxLength={1000}
                    rows={4}
                    placeholder={capitalize(translate('enter_custom_text', language))}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                />
            ) : (
                <select
                    className="w-full p-4 border rounded-lg text-color-third bg-color-primary mb-4"
                    value={selectedText}
                    onChange={(e) => setSelectedText(e.target.value)}
                >
                    <option value="" disabled>
                        {translate('choose_predefined_text', language)}
                    </option>
                    {Array.isArray(poetTexts) &&
                        poetTexts.map((text: PoetText) => (
                            <option key={text.poetTextId} value={text.poetTextId}>
                                {text.poetAuthor} - {text.poetFragmentName}
                            </option>
                        ))}
                </select>
            )}
        </div>
    );
};
export default TextSelectionSection;
