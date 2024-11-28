import { useEffect, useState } from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type TypinginputFieldProps = {
    onKeyPress: (lastKeyPress: string) => void;
    isTypingFinished: boolean;
    labelText?: string;
};

const TypinginputField: React.FC<TypinginputFieldProps> = ({ onKeyPress, isTypingFinished, labelText }) => {
    const [currentWord, setLastWord] = useState<string>('');
    const { language } = useLanguage();

    if (!labelText) {
        labelText = 'keyboard_input_label';
    }

    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // get the last character typed
        const keyPressed = e.target.value.slice(-1);

        // for input value we set currentWord, on space enter we clear it
        if (keyPressed === ' ' || keyPressed === 'Enter') setLastWord('');
        setLastWord((currentWord) => currentWord + keyPressed);
        onKeyPress(keyPressed);
    };

    useEffect(() => {
        setLastWord('');
    }, [isTypingFinished]);

    return (
        <div className="min-w-[46rem] mx-auto p-4">
            <form>
                <div className="mb-6">
                    <label htmlFor="inputField" className="text-color-secondary font-md">
                        {translate(labelText, language)}
                    </label>

                    <input
                        id="inputField"
                        type="text"
                        value={currentWord}
                        onChange={oninputChange}
                        className="bg-secondary border border-primary rounded-sm p-2 w-full text-xl text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                </div>
            </form>
        </div>
    );
};

export default TypinginputField;
