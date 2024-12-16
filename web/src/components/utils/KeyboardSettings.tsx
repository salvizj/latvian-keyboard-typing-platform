import { useKeyboardSettings } from '../../context/KeyboardSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { KeyboardLayouts } from '../../types';
import translate from '../../utils/translate';
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
                <DefaultPanel className="fixed top-0 left-0 w-full h-full bg-opacity-90 bg-color-primary z-50">
                    <div className="flex flex-col gap-6 items-start relative">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            {translate('keyboard_settings', language)}
                        </h1>

                        <div className="flex flex-col gap-4 w-full">
                            <label htmlFor="keyboardLayout" className="text-primary">
                                {translate('keyboard_layout', language)}
                            </label>
                            <select
                                className="w-full p-4 border rounded-md text-color-third bg-color-primary"
                                value={keyboardLayout}
                                onChange={(e) => setKeyboardLayout(e.target.value as KeyboardLayouts)}
                            >
                                <option value="" disabled>
                                    {translate('choose_preferable_keyboard_layout', language)}
                                </option>
                                {Object.values(KeyboardLayouts).map((keyboardLayout) => (
                                    <option key={keyboardLayout} value={keyboardLayout}>
                                        {translate(keyboardLayout, language)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    id="showKeyboardLayout"
                                    checked={showKeyboardLayout}
                                    onChange={() => setShowKeyboardLayout(!showKeyboardLayout)}
                                    className="mr-2"
                                />
                                <label htmlFor="showKeyboardLayout" className="text-primary">
                                    {translate('show_keyboard_layout', language)}
                                </label>
                            </div>

                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    id="showHands"
                                    checked={showHands}
                                    onChange={() => setShowHands(!showHands)}
                                    className="mr-2"
                                />
                                <label htmlFor="showHands" className="text-primary">
                                    {translate('show_hands', language)}
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={() => setClose(true)}
                            className="absolute top-0 right-0 text-3xl hover:text-color-primary-hover-text"
                        >
                            <MdClose />
                        </button>
                    </div>
                </DefaultPanel>
            )}
            <button
                onClick={() => setClose(false)}
                className="text-color-primary text-lg hover:text-color-primary-hover-text flex justify-start items-center gap-0 sm:gap-4 mt-6 text-left"
            >
                <FaCog />
                {!isMinimized && translate('keyboard_settings', language)}
            </button>
        </>
    );
};

export default KeyboardSettings;
