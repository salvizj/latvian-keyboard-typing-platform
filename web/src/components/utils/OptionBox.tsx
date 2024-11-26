import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { PoetText, ValidationErrors } from '../../types';
import LobbyOptions from '../typingRace/LobbyOptions';
import TextSelectionSection from './TextSelectionSection';
import RangeInput from './RangeInput';
import InfoBox from './InfoBox';
import { useState } from 'react';
import validateOptions from '../../utils/ValidateOptions';

type OptionBoxProps = {
    title: string;
    setText: (text: string) => void;
    setIsOptionsSet: (isOptionsSet: boolean) => void;
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
    setUsername?: (username: string) => void;
    username?: string;
};

const OptionBox: React.FC<OptionBoxProps> = ({
    title,
    setText,
    lobbyId,
    setIsOptionsSet,
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
    setUsername,
    username,
}) => {
    const { language } = useLanguage();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [showErrors, setShowErrors] = useState(false);

    const handleStartTest = () => {
        const error: ValidationErrors = validateOptions({
            isCustomText,
            customText,
            isRace,
            username,
            lobbyMode,
            lobbyId,
            selectedText,
            language,
            time,
            maxPlayerCount,
        });

        setValidationErrors(error);

        if (Object.keys(error).length === 0) {
            setIsOptionsSet(true);
        } else {
            setShowErrors(true);
        }
    };
    return (
        <InfoBox>
            <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

            {/*Create or input lobbyId and username */}
            {isRace && lobbyMode && (
                <LobbyOptions
                    username={username ?? ''}
                    setUsername={setUsername}
                    lobbyId={lobbyId ?? ''}
                    setLobbyId={setLobbyId}
                    lobbyMode={lobbyMode}
                    setLobbyMode={setLobbyMode}
                />
            )}
            {showErrors && validationErrors.username && (
                <p className="text-red-500 text-sm">{validationErrors.username}</p>
            )}
            {showErrors && validationErrors.lobbyId && (
                <p className="text-red-500 text-sm">{validationErrors.lobbyId}</p>
            )}
            {(lobbyMode === 'create' || !isRace) && (
                <>
                    {/*Max player range input */}
                    {isRace && maxPlayerCount && setMaxPlayerCount && (
                        <RangeInput
                            label="select_max_player_count"
                            value={maxPlayerCount}
                            onChange={setMaxPlayerCount}
                            min={2}
                            max={10}
                            step={1}
                            labelSuffix="max_player_count"
                        />
                    )}
                    {showErrors && validationErrors.maxPlayerCount && (
                        <p className="text-red-500 text-sm">{validationErrors.maxPlayerCount}</p>
                    )}
                    {/*Time range input */}
                    <RangeInput
                        label="select_time"
                        value={time}
                        onChange={setTime}
                        min={10}
                        max={120}
                        step={5}
                        labelSuffix="seconds"
                    />
                    {showErrors && validationErrors.time && (
                        <p className="text-red-500 text-sm">{validationErrors.time}</p>
                    )}
                    {/*Text select or input*/}
                    <TextSelectionSection
                        setText={setText}
                        isCustomText={isCustomText}
                        setCustomText={setCustomText}
                        customText={customText}
                        selectedText={selectedText}
                        setSelectedText={setSelectedText}
                        poetTexts={poetTexts}
                        setIsCustomText={setIsCustomText}
                    />
                    {showErrors && validationErrors.customText && (
                        <p className="text-red-500 text-sm mb-4">{validationErrors.customText}</p>
                    )}
                    {showErrors && validationErrors.selectedText && (
                        <p className="text-red-500 text-sm mb-4">{validationErrors.selectedText}</p>
                    )}
                </>
            )}

            <button
                onClick={handleStartTest}
                className="bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary "
            >
                {capitalize(translate(startText, language))}
            </button>
            {poetTextsError && <p className="text-red-500 mt-1 mb-1 text-sm">{poetTextsError}</p>}
        </InfoBox>
    );
};

export default OptionBox;
