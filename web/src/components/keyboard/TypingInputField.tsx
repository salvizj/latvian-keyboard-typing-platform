import { useEffect, useState } from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type TypinginputFieldProps = {
    onKeyPress: (lastKeyPress: string) => void;
    isTypingFinished: boolean;
};

const TypinginputField: React.FC<TypinginputFieldProps> = ({ onKeyPress, isTypingFinished }) => {
    const [currentWord, setLastWord] = useState<string>('');
    const { language } = useLanguage();
    const oninputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // get the last character typed
        const keyPressed = e.target.value.slice(-1);

        // for input value we set currentWord, on space enter we clear it
        if (keyPressed === ' ') setLastWord('');
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
                    <label htmlFor="inputField" className="secondary-text font-md">
                        {translate('keyboard_input_label', language)}
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
