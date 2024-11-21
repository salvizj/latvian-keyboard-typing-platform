import React, { useState } from 'react';
import Button from '../utils/Button';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { useGetPoetTexts } from '../../hooks/useGetPoetTexts';
import { PoetText } from '../../types';

type TypingTestOptionScreenProps = {
    setTime: (time: number) => void;
    setText: (text: string) => void;
    setStartTest: (startTest: boolean) => void;
};

const TypingTestOptionScreen: React.FC<TypingTestOptionScreenProps> = ({ setTime, setText, setStartTest }) => {
    const { language } = useLanguage();
    const [time, setLocalTime] = useState(10);
    const [isCustomText, setIsCustomText] = useState(false);
    const [customText, setCustomText] = useState('');
    const [selectedText, setSelectedText] = useState('');

    const { poetTexts, poetTexstsError } = useGetPoetTexts();

    const handleStartTest = () => {
        setTime(time);
        setText(isCustomText ? customText : selectedText);
        setStartTest(true);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    {translate('pick_options_to_start_test', language)}
                </h2>

                <div className="mb-6">
                    <label className="block mb-2">{translate('select_time', language)}:</label>
                    <input
                        type="range"
                        min="10"
                        max="120"
                        step="10"
                        value={time}
                        onChange={(e) => setLocalTime(Number(e.target.value))}
                        className="w-full"
                    />
                    <p className="text-center">
                        {time} {translate('seconds', language)}
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block mb-2">{translate('select_text_option', language)}:</label>
                    <div className="flex gap-4">
                        <Button
                            className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary"
                            onClick={() => setIsCustomText(false)}
                        >
                            {capitalize(translate('pick_text', language))}
                        </Button>
                        <Button
                            className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary"
                            onClick={() => setIsCustomText(true)}
                        >
                            {capitalize(translate('custom_text', language))}
                        </Button>
                    </div>
                </div>

                {isCustomText ? (
                    <textarea
                        className="w-full p-4 border rounded-lg resize-none  third-text primary-bg placeholder-third-text"
                        maxLength={1000}
                        rows={4}
                        placeholder={capitalize(translate('enter_custom_text', language))}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                    />
                ) : (
                    <select
                        className="w-full p-4 border rounded-lg third-text primary-bg"
                        value={selectedText}
                        onChange={(e) => setSelectedText(e.target.value)}
                    >
                        <option value="" disabled>
                            {translate('choose_predefined_text', language)}
                        </option>
                        {poetTexts &&
                            poetTexts.map((text: PoetText) => (
                                <option key={text.id} value={text.id}>
                                    {text.poetAuthor} - {text.poetFragmentName}
                                </option>
                            ))}
                    </select>
                )}

                <Button
                    onClick={handleStartTest}
                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6"
                >
                    {capitalize(translate('start_test', language))}
                </Button>

                {poetTexstsError && (
                    <div className="tex-primary text-center text-xl bg-transparent">{poetTexstsError}</div>
                )}
            </div>
        </div>
    );
};

export default TypingTestOptionScreen;
