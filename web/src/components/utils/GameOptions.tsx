import { useLanguage } from '../../context/LanguageContext';
import { GameOption } from '../../types';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import DefaultPanel from './DefaultPanel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GameOptions = () => {
    const { language } = useLanguage();
    const [gameOption, setGameOption] = useState<GameOption>(GameOption.HideWords);
    const navigate = useNavigate();

    const startGame = () => {
        navigate(`/game/${gameOption}`);
    };
    return (
        <>
            <DefaultPanel>
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate('games', language))}</h2>
                <label htmlFor="games" className="text-primary">
                    {capitalize(translate('games', language))}
                </label>
                <select
                    className="w-full p-4 border rounded-lg text-color-third bg-color-primary mb-4"
                    value={gameOption}
                    onChange={(e) => setGameOption(e.target.value as GameOption)}
                >
                    <option value="" disabled>
                        {capitalize(translate('choose_game', language))}
                    </option>
                    {Object.values(GameOption).map((gameOption) => (
                        <option key={gameOption} value={gameOption}>
                            {translate(gameOption, language)}
                        </option>
                    ))}
                </select>

                <button
                    onClick={() => startGame()}
                    className="bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary "
                >
                    {capitalize(translate('start_game', language))}
                </button>
            </DefaultPanel>
        </>
    );
};

export default GameOptions;
