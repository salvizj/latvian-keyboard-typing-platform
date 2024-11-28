import TypinginputField from '../components/keyboard/TypingInputField';
import { useOptions } from '../context/OptionsContext';
import { useEffect } from 'react';
import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import Countdown from '../components/utils/Countdown';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useNavigate } from 'react-router-dom';
import useHideWords from '../hooks/useHideWords';

const GamePage = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { setText } = useOptions();

    useEffect(() => {
        setText('dasd dasdas asdasd');
    });

    const { gameState, handleKeyPress, completionTitle, currentWord, isTypingFinished } = useHideWords();

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-2xl text-center text-color-secondary p-4">
                    {translate('round', language)} {gameState.round}
                </div>
                <Countdown start={!gameState.isGameOver} />
                {gameState.showTextTime > 0 && (
                    <div className="flex justify-center items-center flex-wrap bg-color-third border border-primary p-6 min-w-[44rem] max-w-[44rem] gap-1">
                        <span className="flex flex-row justify-center items-center gap-1 ">
                            <span className="text-color-typing text-2xl">{currentWord}</span>
                        </span>
                    </div>
                )}
                <TypinginputField
                    onKeyPress={handleKeyPress}
                    isTypingFinished={isTypingFinished}
                    labelText="type_word_that_shows_above"
                />
            </div>
            {gameState.isGameOver && (
                <CompletionScreen
                    title={completionTitle}
                    buttons={[
                        {
                            text: 'home',
                            onClick: () => navigate('/'),
                        },
                        {
                            text: 'restart',
                            onClick: () => location.reload(),
                        },
                    ]}
                />
            )}
        </>
    );
};

export default GamePage;
