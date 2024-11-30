import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type SignInBtnProps = {
    isMinimized: boolean;
};

export default function SignInBtn({ isMinimized }: SignInBtnProps) {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/sign-in');
    };

    return (
        <button
            onClick={handleSignIn}
            className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center justify-start flex-row gap-4"
        >
            <FaSignInAlt />
            {!isMinimized && capitalize(translate('sign_in', language))}
        </button>
    );
}
