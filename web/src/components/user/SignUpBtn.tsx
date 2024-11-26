import { SignUpButton, useClerk } from '@clerk/clerk-react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';

export default function SignUpBtn() {
    const { language } = useLanguage();
    const { openSignUp } = useClerk();

    return (
        <SignUpButton>
            <button
                onClick={() => openSignUp({ redirectUrl: window.location.origin })}
                className="text-color-primary text-lg hover:text-color-primary-hover-text"
            >
                {capitalize(translate('sign_up', language))}
            </button>
        </SignUpButton>
    );
}
