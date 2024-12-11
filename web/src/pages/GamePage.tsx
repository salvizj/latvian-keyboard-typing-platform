import TypinginputField from '../components/keyboard/TypingInputField';
import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import Countdown from '../components/utils/Countdown';
import CompletionScreen from '../components/utils/CompletionScreen';
import { useNavigate, useParams } from 'react-router-dom';
import useHideWords from '../hooks/useHideWords';
import useGetLatvianWords from '../hooks/useGetLatvianWords';
import usePostGameRecord from '../hooks/usePostGameRecord';

const GamePage = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { latvianWords, latvianWordsError } = useGetLatvianWords();
    const { gameState, handleKeyPress, completionTitle, currentWord, hasWords, isTypingFinished } =
        useHideWords(latvianWords);
    const { gameOption } = useParams<{ gameOption: string }>();
    const { gameRecordPostError, gameRecordPostLoading } = usePostGameRecord(
        gameOption,
        gameState.round,
        gameState.isGameOver
    );

    // early return if there's an error or no words available
    if (latvianWordsError || !hasWords) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-color-secondary">{translate('error_game_not_available', language)}</p>
            </div>
        );
    }

    if (!gameRecordPostLoading && gameRecordPostError) {
        return <p className="text-xl text-color-secondary">{translate(gameRecordPostError, language)}</p>;
    }

    // show completion screen if game is over or no more words
    if (gameState.isGameOver || !currentWord) {
        return (
            <CompletionScreen
                title={completionTitle}
                showMetrics={false}
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
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-xl text-center text-color-primary p-4">
                {translate('round', language)} {gameState.round}
            </div>
            <Countdown start={!gameState.isGameOver} />
            {gameState.showTextTime > 0 && (
                <div className="flex justify-center items-center flex-wrap bg-color-third border border-primary p-6 min-w-[44rem] max-w-[44rem] gap-1">
                    <span className="flex flex-row justify-center items-center gap-1">
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
    );
};

export default GamePage;
