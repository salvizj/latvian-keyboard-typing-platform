import { SignOutButton, useAuth } from '@clerk/clerk-react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import { capitalize } from '../../utils/capitalize';

export default function SignOutBtn() {
    const { signOut, isSignedIn } = useAuth();
    const { language } = useLanguage();

    return (
        isSignedIn && (
            <SignOutButton>
                <button
                    className="text-color-primary text-lg hover:text-color-primary-hover-text"
                    onClick={() => signOut({ redirectUrl: window.location.origin })}
                >
                    {capitalize(translate('sign_out', language))}
                </button>
            </SignOutButton>
        )
    );
}
