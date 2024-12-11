import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { GameOption } from '../types';
import DefaultPanel from '../components/utils/DefaultPanel';
import translate from '../utils/translate';
import useGetGameRecord from '../hooks/useGetGameRecord';

const GamesPage = () => {
    const { language } = useLanguage();
    const [gameOption, setGameOption] = useState<GameOption | string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { gameRecord, gameRecordGetError, gameRecordGetLoading } = useGetGameRecord(gameOption);

    const startGame = () => {
        if (!gameOption && !gameRecordGetError && !gameRecordGetLoading) {
            setShowError(true);
            return; // prevent navigation if no game option is selected
        }

        setShowError(false);
        navigate(`/game/${gameOption}`);
    };
    return (
        <>
            <DefaultPanel>
                <div className="flex flex-col gap-4 items-start justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-center">{translate('games', language)}</h1>

                    {gameRecord != null && (
                        <p>
                            {translate(gameOption, language)} {translate('record', language)}
                            {': '}
                            {gameRecord}
                        </p>
                    )}

                    <select
                        className="w-full p-4 mb-2 border rounded-md text-color-third bg-color-primary"
                        value={gameOption}
                        onChange={(e) => setGameOption(e.target.value as GameOption)}
                    >
                        <option value="" disabled>
                            {translate('choose_game', language)}
                        </option>
                        {Object.values(GameOption).map((gameOption) => (
                            <option key={gameOption} value={gameOption}>
                                {translate(gameOption, language)}
                            </option>
                        ))}
                    </select>

                    {!gameOption && showError && (
                        <p className="text-red-500 text-sm">{translate('must_select_game', language)}</p>
                    )}
                    {!gameRecordGetLoading && gameRecordGetError && <p>{translate(gameRecordGetError, language)}</p>}
                    <button
                        onClick={startGame}
                        className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary"
                    >
                        {translate('start_game', language)}
                    </button>
                </div>
            </DefaultPanel>
        </>
    );
};

export default GamesPage;
