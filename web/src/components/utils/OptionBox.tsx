import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
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
        customText,
        setCustomText,
        setTextId,
        setTextType,
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

        if (Object.keys(error).length === 0 && time !== null) {
            setIsOptionsSet(true);
        } else {
            setShowErrors(true);
        }
    };

    return (
        <DefaultPanel>
            <h1 className="text-3xl font-bold mb-8 text-center">{translate(title, language)}</h1>

            {/* create or input lobbyId and username */}
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
                    {/* max player range input */}
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
                    {/* time range input */}
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
                    {/* text select or input*/}
                    <TextSelectionSection
                        setText={setText}
                        isCustomText={isCustomText}
                        setCustomText={setCustomText}
                        customText={customText}
                        selectedText={selectedText}
                        setSelectedText={setSelectedText}
                        setIsCustomText={setIsCustomText}
                        setTextid={setTextId}
                        setTextType={setTextType}
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
                {translate(startText, language)}
            </button>
        </DefaultPanel>
    );
};

export default OptionBox;
