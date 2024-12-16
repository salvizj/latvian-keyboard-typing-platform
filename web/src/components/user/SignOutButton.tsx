import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { FaSignOutAlt } from 'react-icons/fa';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStatus from '../../hooks/useAuthStatus';

type SignOutBtnProps = {
    isMinimized: boolean;
};

export default function SignOutBtn({ isMinimized }: SignOutBtnProps) {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { isSignedIn, loading } = useAuthStatus();
    const [error, setError] = useState<string | null>(null);

    if (loading) {
        return <p>{translate('loading', language)}</p>;
    }

    const handleSignOut = async () => {
        if (!isSignedIn) {
            setError(translate('error_user_not_signed_in', language));
        } else {
            setError(null);
            const { error } = await supabase.auth.signOut();

            if (error) {
                setError(translate('error_sign_out', language));
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-full">
            <button
                className="text-color-primary text-lg hover:text-color-primary-hover-text flex items-center gap-4 text-left px-4"
                onClick={handleSignOut}
                disabled={loading}
            >
                <FaSignOutAlt />
                {!isMinimized && translate('sign_out', language)}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
