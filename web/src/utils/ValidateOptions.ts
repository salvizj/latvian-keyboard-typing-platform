import { ValidationErrors } from './../types';
import translate from './translate';

type ValidateOptionsParams = {
    isCustomText: boolean;
    customText: string;
    isRace: boolean;
    username?: string;
    lobbyMode?: string;
    lobbyId?: string;
    selectedText: string;
    time: number | null;
    maxPlayerCount?: number;
    language: string;
};

const validateOptions = (props: ValidateOptionsParams): ValidationErrors => {
    const {
        isCustomText,
        customText,
        isRace,
        username,
        lobbyMode,
        lobbyId,
        language,
        selectedText,
        time,
        maxPlayerCount,
    } = props;

    const errors: ValidationErrors = {};

    if (lobbyMode !== 'join') {
        if (isCustomText) {
            if (!customText.trim()) {
                errors.customText = translate('must_enter_custom_text', language);
            } else if (customText.length < 10) {
                errors.customText = translate('custom_text_too_short', language);
            } else if (customText.length > 1000) {
                errors.customText = translate('custom_text_too_long', language);
            }
        } else if (!isCustomText && !selectedText) {
            errors.selectedText = translate('must_select_text', language);
        }
        if (time != null) {
            if (time > 120 || time < 10) {
                errors.time = translate('must_select_text', language);
            }
            if (time < 10) {
                errors.time = translate('must_select_text', language);
            }
        }

        if (maxPlayerCount !== undefined && maxPlayerCount > 10) {
            errors.maxPlayerCount = translate('invalid_player_count_large', language);
        }
        if (maxPlayerCount !== undefined && maxPlayerCount < 2) {
            errors.maxPlayerCount = translate('invalid_player_count_small', language);
        }
    }

    if (isRace) {
        if (!username?.trim()) {
            errors.username = translate('must_enter_username', language);
        }

        if (lobbyMode === 'join' && !lobbyId?.trim()) {
            errors.lobbyId = translate('must_enter_lobby_id', language);
        }
    }

    return errors;
};
export default validateOptions;
