import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { PoetText } from '../../types';
import LobbyOptions from '../typingRace/LobbyOptions';
import TextSelectionSection from './TextSelectionSection';
import RangeInput from './RangeInput';
import InfoBox from './InfoBox';

type OptionBoxProps = {
    title: string;
    setText: (text: string) => void;
    setStart: (startTest: boolean) => void;
    setLobbyId?: (lobbyId: string) => void;
    setLobbyMode?: (lobbyMode: 'create' | 'join') => void;
    lobbyMode?: 'create' | 'join';
    startText: string;
    lobbyId?: string;
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
    start: boolean;
};

const OptionBox: React.FC<OptionBoxProps> = ({
    title,
    setText,
    lobbyId,
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
    start,
}) => {
    const { language } = useLanguage();

    const handleStartTest = () => {
        setTime(time);
        setText(isCustomText ? customText : selectedText);
        setStart(true);
    };
    return (
        <InfoBox>
            <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

            <>
                {/*Create or input lobbyId  */}
                {isRace && setLobbyMode && lobbyMode && setLobbyId && (
                    <LobbyOptions
                        lobbyId={lobbyId ?? ''}
                        setLobbyId={setLobbyId}
                        lobbyMode={lobbyMode}
                        setLobbyMode={setLobbyMode}
                        language={language}
                    />
                )}

                {/*Max player range input */}
                {isRace && maxPlayerCount && setMaxPlayerCount && (
                    <RangeInput
                        label="select_max_player_count"
                        value={maxPlayerCount}
                        onChange={setMaxPlayerCount}
                        language={language}
                        min={2}
                        max={10}
                        step={1}
                        labelSuffix="max_player_count"
                    />
                )}
                {/*Time range input */}
                <RangeInput
                    label="select_time"
                    value={time}
                    onChange={setTime}
                    language={language}
                    min={10}
                    max={120}
                    step={5}
                    labelSuffix="seconds"
                />
                {/*Text select or input*/}
                <TextSelectionSection
                    isCustomText={isCustomText}
                    setCustomText={setCustomText}
                    customText={customText}
                    selectedText={selectedText}
                    setSelectedText={setSelectedText}
                    poetTexts={poetTexts}
                    language={language}
                    setIsCustomText={setIsCustomText}
                />
            </>
            {isCustomText && customText && <p>{capitalize(translate('must_enter_custom_text', language))}</p>}
            {isRace && lobbyId === '' && lobbyMode === 'join' && start && (
                <p>{capitalize(translate('must_enter_lobby_id', language))}</p>
            )}
            <button
                onClick={handleStartTest}
                className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:text-color-primary-hover-text border secondary mt-6"
            >
                {capitalize(translate(startText, language))}
            </button>
            {poetTextsError && <div className="tex-primary text-center text-lg bg-transparent">{poetTextsError}</div>}
        </InfoBox>
    );
};

export default OptionBox;
