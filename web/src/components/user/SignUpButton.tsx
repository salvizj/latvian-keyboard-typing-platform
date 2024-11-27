import { SignUpButton, useClerk } from '@clerk/clerk-react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { FaUserPlus } from 'react-icons/fa';

type SignUpBtnProps = {
    isMinimized: boolean;
};

export default function SignUpBtn({ isMinimized }: SignUpBtnProps) {
    const { language } = useLanguage();
    const { openSignUp } = useClerk();

    return (
        <SignUpButton>
            <button
                onClick={() => openSignUp({ redirectUrl: window.location.origin })}
                className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center justify-start flex-row gap-4"
            >
                <FaUserPlus />
                {!isMinimized && capitalize(translate('sign_up', language))}
            </button>
        </SignUpButton>
    );
}
