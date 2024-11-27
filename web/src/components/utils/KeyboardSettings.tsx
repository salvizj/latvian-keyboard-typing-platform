import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { KeyboardLayouts, KeyboardLayoutValues } from '../../types';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { MdClose } from 'react-icons/md';
import DefaultPanel from './DefaultPanel';
import { useState } from 'react';
import { FaCog } from 'react-icons/fa';

type KeyboardSettingsProps = {
    isMinimized: boolean;
};

const KeyboardSettings = ({ isMinimized }: KeyboardSettingsProps) => {
    const { setKeyboardLayout, setShowKeyboardLayout, setShowHands, showKeyboardLayout, keyboardLayout, showHands } =
        useKeyboardSettings();
    const { language } = useLanguage();
    const [close, setClose] = useState(true);

    return (
        <>
            {!close && (
                <DefaultPanel>
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        {capitalize(translate('keyboard_settings', language))}
                    </h2>
                    <div className="flex flex-col gap-4">
                        <label htmlFor="keyboardLayout" className="text-primary">
                            {capitalize(translate('keyboard_layout', language))}
                        </label>
                        <select
                            className="w-full p-4 border rounded-lg text-color-third bg-color-primary mb-4"
                            value={keyboardLayout}
                            onChange={(e) => setKeyboardLayout(e.target.value as KeyboardLayouts)}
                        >
                            <option value="" disabled>
                                {capitalize(translate('choose_preferable_keyboard_layout', language))}
                            </option>
                            {KeyboardLayoutValues.map((layout) => (
                                <option key={layout} value={layout}>
                                    {layout}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row ">
                            <input
                                type="checkbox"
                                id="showKeyboardLayout"
                                checked={showKeyboardLayout}
                                onChange={() => setShowKeyboardLayout(showKeyboardLayout === true ? false : true)}
                                className="mr-2"
                            />
                            <label htmlFor="showKeyboardLayout" className="text-primary">
                                {capitalize(translate('show_keyboard_layout', language))}
                            </label>
                        </div>
                        <div className="flex flex-row ">
                            <input
                                type="checkbox"
                                id="showHands"
                                checked={showHands}
                                onChange={() => setShowHands(showHands === true ? false : true)}
                                className="mr-2"
                            />
                            <label htmlFor="showHands" className="text-primary">
                                {capitalize(translate('show_hands', language))}
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={() => setClose(true)}
                        className="absolute top-4 right-4 text-3xl hover:text-color-primary-hover-text"
                    >
                        <MdClose />
                    </button>
                </DefaultPanel>
            )}
            <button
                onClick={() => setClose(false)}
                className="text-color-primary flex flex-row-reverse gap-4 justify-end items-center text-lg mt-6 hover:text-color-primary-hover-text"
            >
                {!isMinimized && capitalize(translate('keyboard_settings', language))}
                <FaCog />
            </button>
        </>
    );
};

export default KeyboardSettings;
