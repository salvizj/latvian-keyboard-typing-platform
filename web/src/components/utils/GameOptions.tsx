import { useLanguage } from '../../context/LanguageContext';
import { GameOption, GameOptionValues } from '../../types';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { MdClose } from 'react-icons/md';
import DefaultPanel from './DefaultPanel';
import { useState } from 'react';
import { FaGamepad } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type GameOptionsProps = {
    isMinimized: boolean;
};

const GameOptions = ({ isMinimized }: GameOptionsProps) => {
    const { language } = useLanguage();
    const [close, setClose] = useState(true);
    const [gameOption, setGameOption] = useState<GameOption>(GameOption.HideWords);
    const navigate = useNavigate();

    const startGame = () => {
        navigate(`/game/${gameOption}`);
        setClose(true);
    };
    return (
        <>
            {!close && (
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
                        {GameOptionValues.map((gameOption) => (
                            <option key={gameOption} value={gameOption}>
                                {translate(gameOption, language)}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => setClose(true)}
                        className="absolute top-4 right-4 text-3xl hover:text-color-primary-hover-text"
                    >
                        <MdClose />
                    </button>
                    <button
                        onClick={() => startGame()}
                        className="bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary "
                    >
                        {capitalize(translate('start_game', language))}
                    </button>
                </DefaultPanel>
            )}
            <button
                onClick={() => setClose(false)}
                className="text-color-primary flex flex-row-reverse gap-4 justify-end items-center text-lg mt-6 hover:text-color-primary-hover-text"
            >
                {!isMinimized && capitalize(translate('games', language))}
                <FaGamepad />
            </button>
        </>
    );
};

export default GameOptions;
