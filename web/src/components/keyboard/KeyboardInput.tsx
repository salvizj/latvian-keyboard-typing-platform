import { useEffect, useState } from 'react';
import Input from '../utils/Input';
import Label from '../utils/Label';

type KeyboardInputProps = {
    handleKeyPress: (lastKeyPress: string) => void;
    finished: boolean;
};

const KeyboardInput: React.FC<KeyboardInputProps> = ({
    handleKeyPress,
    finished,
}) => {
    const [lastWord, setLastWord] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // get the last character typed
        const keyPressed = e.target.value.slice(-1);

        // for input value we set lastWord, on space enter we clear it
        if (keyPressed === ' ') setLastWord('');
        setLastWord((lastWord) => lastWord + keyPressed);
        handleKeyPress(keyPressed);
    };

    useEffect(() => {
        setLastWord('');
    }, [finished]);

    return (
        <div className="min-w-[46rem] mx-auto p-4">
            <form>
                <div className="mb-6">
                    <Label text="keyboard_input_label" htmlFor="inputField" />
                    <Input
                        id="inputField"
                        type="text"
                        value={lastWord}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </div>
    );
};

export default KeyboardInput;
