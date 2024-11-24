import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { PoetText } from '../../types';
import LobbyOptions from '../typingRace/LobbyOptions';
import TextSelectionSection from './TextSelectionSection';
import RangeInput from './RangeInput';
import InfoBox from './InfoBox';
import { useCallback, useState } from 'react';

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

type ValidationErrors = {
    customText?: string;
    lobbyId?: string;
    username?: string;
    selectedText?: string;
    time?: string;
    maxPlayerCount?: string;
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

    const validateInputs = useCallback((): boolean => {
        const errors: ValidationErrors = {};
        if (lobbyMode === 'create') {
            if (isCustomText) {
                if (!customText.trim()) {
                    errors.customText = translate('must_enter_custom_text', language);
                } else if (customText.length < 10) {
                    errors.customText = translate('custom_text_too_short', language);
                } else if (customText.length > 1000) {
                    errors.customText = translate('custom_text_too_long', language);
                }
            } else if (!selectedText) {
                errors.selectedText = translate('must_select_text', language);
            }
            if (time < 10 || time > 120) {
                errors.time = translate('invalid_time_range', language);
            }
        }
        if (isRace) {
            if (!username?.trim()) {
                errors.username = translate('must_enter_username', language);
            }

            if (lobbyMode === 'join' && !lobbyId?.trim()) {
                errors.lobbyId = translate('must_enter_lobby_id', language);
            }

            if (maxPlayerCount !== undefined && (maxPlayerCount < 2 || maxPlayerCount > 10)) {
                errors.maxPlayerCount = translate('invalid_player_count', language);
            }
        }

        setValidationErrors(errors);
        setShowErrors(true);
        return Object.keys(errors).length === 0;
    }, [lobbyMode, isRace, isCustomText, selectedText, time, customText, language, username, lobbyId, maxPlayerCount]);

    const handleStartTest = () => {
        if (validateInputs()) {
            console.log('validated input');
            setTime(time);
            setText(isCustomText ? customText : selectedText);
            setIsOptionsSet(true);
        }
    };
    return (
        <InfoBox>
            <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>

            <>
                {/*Create or input lobbyId and username */}
                {isRace && setLobbyMode && lobbyMode && setLobbyId && setUsername && (
                    <LobbyOptions
                        username={username ?? ''}
                        setUsername={setUsername}
                        lobbyId={lobbyId ?? ''}
                        setLobbyId={setLobbyId}
                        lobbyMode={lobbyMode}
                        setLobbyMode={setLobbyMode}
                        language={language}
                    />
                )}
                {showErrors && validationErrors.username && (
                    <p className="text-red-500 text-sm">{validationErrors.username}</p>
                )}
                {showErrors && validationErrors.lobbyId && (
                    <p className="text-red-500 text-sm">{validationErrors.lobbyId}</p>
                )}

                {/*Time, max player count, text, settings*/}
                {lobbyMode === 'create' && (
                    <>
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
                        {showErrors && validationErrors.maxPlayerCount && (
                            <p className="text-red-500 text-sm">{validationErrors.maxPlayerCount}</p>
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
                        {showErrors && validationErrors.time && (
                            <p className="text-red-500 text-sm">{validationErrors.time}</p>
                        )}
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
                        {showErrors && validationErrors.customText && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.customText}</p>
                        )}
                        {showErrors && validationErrors.selectedText && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.selectedText}</p>
                        )}
                    </>
                )}
            </>
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
