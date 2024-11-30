import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalizeString';
import { FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

type SignOutBtnProps = {
    isMinimized: boolean;
};

export default function SignOutBtn({ isMinimized }: SignOutBtnProps) {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Sign out error:', error.message);
        } else {
            navigate('/');
        }
    };

    return (
        <button
            className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center gap-4"
            onClick={handleSignOut}
        >
            <FaSignOutAlt />
            {!isMinimized && capitalize(translate('sign_out', language))}
        </button>
    );
}
