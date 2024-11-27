import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { SignInButton } from '@clerk/clerk-react';
import { FaSignInAlt } from 'react-icons/fa';

type SignInBtnProps = {
    isMinimized: boolean;
};

export default function SignInBtn({ isMinimized }: SignInBtnProps) {
    const { language } = useLanguage();

    return (
        <SignInButton>
            <button className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center justify-start flex-row gap-4">
                <FaSignInAlt />
                {!isMinimized && capitalize(translate('sign_in', language))}
            </button>
        </SignInButton>
    );
}
