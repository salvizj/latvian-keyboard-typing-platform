import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { ValidationErrors } from '../../types';
import LobbyOptions from '../typingRace/LobbyOptions';
import TextSelectionSection from './TextSelectionSection';
import RangeInput from './RangeInput';
import DefaultPanel from './DefaultPanel';
import { useState } from 'react';
import validateOptions from '../../utils/ValidateOptions';
import { useOptions } from '../../context/OptionsContext';

type OptionBoxProps = {
    isRace: boolean;
    title: string;
    setIsOptionsSet: (isOptionsSet: boolean) => void;
    startText: string;
};

const OptionBox: React.FC<OptionBoxProps> = ({ title, startText, setIsOptionsSet, isRace }) => {
    const {
        setText,
        time,
        setTime,
        lobbyId,
        setLobbyId,
        username,
        setUsername,
        maxPlayerCount,
        setMaxPlayerCount,
        lobbyMode,
        setLobbyMode,
        isCustomText,
        setIsCustomText,
        selectedText,
        setSelectedText,
        poetTexts,
        poetTextsError,
        customText,
        setCustomText,
    } = useOptions();

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
        <DefaultPanel>
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
        </DefaultPanel>
    );
};

export default OptionBox;
