import { SignOutButton, useAuth } from '@clerk/clerk-react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import { capitalize } from '../../utils/capitalizeString';
import { FaSignOutAlt } from 'react-icons/fa';

type SignOutBtnProps = {
    isMinimized: boolean;
};

export default function SignOutBtn({ isMinimized }: SignOutBtnProps) {
    const { signOut, isSignedIn } = useAuth();
    const { language } = useLanguage();

    return (
        isSignedIn && (
            <SignOutButton>
                <button
                    className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center gap-4"
                    onClick={() => signOut({ redirectUrl: window.location.origin })}
                >
                    <FaSignOutAlt />
                    {!isMinimized && capitalize(translate('sign_out', language))}
                </button>
            </SignOutButton>
        )
    );
}
