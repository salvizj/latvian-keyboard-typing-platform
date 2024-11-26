import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import { SignInButton } from '@clerk/clerk-react';

export default function SignInBtn() {
    const { language } = useLanguage();

    return (
        <SignInButton>
            <button className="text-color-primary text-lg hover:text-color-primary-hover-text">
                {capitalize(translate('sign_in', language))}
            </button>
        </SignInButton>
    );
}
