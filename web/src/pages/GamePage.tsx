import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import { useParams } from 'react-router-dom';
import { GameOption } from '../types';
import HideWords from '../components/games/HideWords';
import HideLetters from '../components/games/HideLetters';
import useGetLatvianWords from '../hooks/useGetLatvianWords';
import useAuthStatus from '../hooks/useAuthStatus';

const GamePage = () => {
    const { language } = useLanguage();
    const { gameOption } = useParams<{ gameOption: string }>();
    const { latvianWords, latvianWordsError, latvianWordsLoading } = useGetLatvianWords();
    const { userId } = useAuthStatus();

    if (gameOption != undefined) {
        if (![GameOption.HideLetters, GameOption.HideWords].includes(gameOption as GameOption)) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl text-red-500">{translate('error_unsupported_game_option', language)}</p>
                </div>
            );
        }
    }
    if (latvianWordsLoading) {
        return <p>Loading...</p>;
    }

    if (latvianWordsError) {
        return <p>Error loading words.</p>;
    }

    if (latvianWords.length === 0) {
        return <p>No words available.</p>;
    }

    const renderGame = () => {
        switch (gameOption) {
            case GameOption.HideWords:
                return <HideWords key={GameOption.HideWords} latvianWords={latvianWords} userId={userId} />;
            case GameOption.HideLetters:
                return <HideLetters key={GameOption.HideLetters} userId={userId} />;
            default:
                return <div className="p-4">{translate('game_not_found', language)}</div>;
        }
    };

    return <div className="flex flex-col justify-center items-center h-screen">{renderGame()}</div>;
};

export default GamePage;
