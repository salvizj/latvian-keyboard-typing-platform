import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { PoetText } from '../../types';
import LobbyOptions from '../typingRace/LobbyOptions';

type OptionBoxProps = {
    title: string;
    setText: (text: string) => void;
    setStart: (startTest: boolean) => void;
    setLobbyId?: (lobbyId: string) => void;
    setLobbyMode?: (lobbyMode: 'create' | 'join') => void;
    lobbyMode?: 'create' | 'join';
    startText: string;
    maxPlayerCount?: number;
    setMaxPlayerCount?: (maxPlayerCount: number) => void;
    time: number;
    setTime: (time: number) => void;
    isCustomText: boolean;
    customText: string;
    selectedText: string;
    setIsCustomText: (isCustom: boolean) => void;
    setCustomText: (text: string) => void;
    setSelectedText: (text: string) => void;
    poetTexts: PoetText[];
    poetTextsError?: string | null;
    isRace: boolean;
};

const OptionBox: React.FC<OptionBoxProps> = ({
    title,
    setText,
    setStart,
    setLobbyId,
    setLobbyMode,
    lobbyMode,
    startText,
    setMaxPlayerCount,
    time,
    setTime,
    isCustomText,
    customText,
    selectedText,
    setIsCustomText,
    setCustomText,
    setSelectedText,
    poetTexts,
    maxPlayerCount,
    poetTextsError,
    isRace,
}) => {
    const { language } = useLanguage();
    const handleStartTest = () => {
        setTime(time);
        setText(isCustomText ? customText : selectedText);
        setStart(true);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

                {setLobbyId && lobbyMode && setLobbyMode && (
                    <LobbyOptions setLobbyId={setLobbyId} lobbyMode={lobbyMode} setLobbyMode={setLobbyMode} />
                )}
                {(lobbyMode === 'create' || !isRace) && (
                    <>
                        {isRace && (
                            <div className="mb-6">
                                <label className="block mb-2">{translate('select_max_player_count', language)}:</label>
                                <input
                                    type="range"
                                    min="2"
                                    max="10"
                                    step="1"
                                    value={maxPlayerCount}
                                    onChange={(e) => setMaxPlayerCount?.(Number(e.target.value))}
                                    className="w-full"
                                />
                                <p className="text-center">
                                    {maxPlayerCount} {translate('max_player_count', language)}
                                </p>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block mb-2">{translate('select_time', language)}:</label>
                            <input
                                type="range"
                                min="10"
                                max="120"
                                step="10"
                                value={time}
                                onChange={(e) => setTime(Number(e.target.value))}
                                className="w-full"
                            />
                            <p className="text-center">
                                {time} {translate('seconds', language)}
                            </p>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2">{translate('select_text_option', language)}:</label>
                            <div className="flex gap-4">
                                <button
                                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:third-hover border secondary"
                                    onClick={() => setIsCustomText(false)}
                                >
                                    {capitalize(translate('pick_text', language))}
                                </button>
                                <button
                                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:third-hover border secondary"
                                    onClick={() => setIsCustomText(true)}
                                >
                                    {capitalize(translate('custom_text', language))}
                                </button>
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
                                {Array.isArray(poetTexts) &&
                                    poetTexts.map((text: PoetText) => (
                                        <option key={text.id} value={text.id}>
                                            {text.poetAuthor} - {text.poetFragmentName}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </>
                )}
                <button
                    onClick={handleStartTest}
                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:third-hover border secondary mt-6"
                >
                    {capitalize(translate(startText, language))}
                </button>
                {poetTextsError && (
                    <div className="tex-primary text-center text-lg bg-transparent">{poetTextsError}</div>
                )}
            </div>
        </div>
    );
};

export default OptionBox;
