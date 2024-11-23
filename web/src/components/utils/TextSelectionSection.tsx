import { PoetText } from '../../types';
import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';

const TextSelectionSection: React.FC<{
    isCustomText: boolean;
    setIsCustomText: (isCustom: boolean) => void;
    customText: string;
    setCustomText: (text: string) => void;
    selectedText: string;
    setSelectedText: (text: string) => void;
    poetTexts: PoetText[];
    language: string;
}> = ({
    isCustomText,
    setIsCustomText,
    customText,
    setCustomText,
    selectedText,
    setSelectedText,
    poetTexts,
    language,
}) => {
    return (
        <div className="flex flex-col gap-4 mb-2">
            <label className="mb-2 text-center">{translate('select_text_option', language)}:</label>
            <div className="flex gap-4 justify-center items-center">
                <button
                    className={` py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:text-color-primary-hover-text border secondary ${!isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                    onClick={() => setIsCustomText(false)}
                >
                    {capitalize(translate('pick_text', language))}
                </button>
                <button
                    className={` py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:text-color-primary-hover-text border secondary ${isCustomText ? 'bg-color-primary text-color-third' : 'bg-transparent text-primary'}`}
                    onClick={() => setIsCustomText(true)}
                >
                    {capitalize(translate('custom_text', language))}
                </button>
            </div>
            {isCustomText ? (
                <textarea
                    className="w-full p-4 border rounded-lg resize-none text-color-third bg-color-primary placeholder-color-third"
                    maxLength={1000}
                    rows={4}
                    placeholder={capitalize(translate('enter_custom_text', language))}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                />
            ) : (
                <select
                    className="w-full p-4 border rounded-lg text-color-third bg-color-primary"
                    value={selectedText}
                    onChange={(e) => setSelectedText(e.target.value)}
                >
                    <option value="" disabled>
                        {translate('choose_predefined_text', language)}
                    </option>
                    {Array.isArray(poetTexts) &&
                        poetTexts.map((text: PoetText) => (
                            <option key={text.id} value={text.id}>
                                {text.poetAuthor} - {text.poetFragmentName}
                            </option>
                        ))}
                </select>
            )}
        </div>
    );
};
export default TextSelectionSection;
