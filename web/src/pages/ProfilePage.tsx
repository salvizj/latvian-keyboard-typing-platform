import { useState, useEffect } from 'react';
import DefaultPanel from '../components/utils/DefaultPanel';
import { supabase } from '../utils/supabaseClient';
import { capitalize } from '../utils/capitalizeString';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';
import { validateEditProfile } from '../utils/validateEditProfileInput';

const ProfilePage = () => {
    const { language } = useLanguage();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data.user?.id && data.user.email) {
                setUserEmail(data.user.email);
                setUserId(data.user.id);
                setEmail(data.user.email);
            }
            if (error) {
                const errorMessage = capitalize(translate('error_fetching_user', language));
                setError(errorMessage);
            }
        };

        fetchUser();
    }, [language]);

    const handleEditToggle = () => {
        setEditMode((prev) => !prev);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errorMessage = validateEditProfile(email, password, confirmPassword);
        setError(translate(errorMessage, language));
        if (!errorMessage && email && password) {
            const { error } = await supabase.auth.updateUser({ email, password });
            if (error) {
                setError(translate('error_updating_profile', language));
            }
            setEditMode(false);
        }
    };

    return (
        <>
            <DefaultPanel>
                <div>
                    <p className="flex flex-col gap-2 mb-2">
                        <strong>{capitalize(translate('user_id', language))}</strong> {userId}
                    </p>
                    <p className="flex flex-col gap-2 mb-2">
                        <strong>{capitalize(translate('email', language))}</strong> {userEmail}
                    </p>

                    {editMode && (
                        <form className="flex flex-col gap-2 my-2" onSubmit={handleEditSubmit}>
                            <input
                                type="email"
                                placeholder={capitalize(translate('email', language))}
                                className="border p-2 mt-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                                value={email ?? ''}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder={capitalize(translate('password', language))}
                                className="border p-2 mt-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                                value={password ?? ''}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder={capitalize(translate('confirm_password', language))}
                                className="border p-2 mt-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                                value={confirmPassword ?? ''}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error && (
                                <p className="text-lg text-red-500 flex justify-center items-center h-full">
                                    {capitalize(error)}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-1/3 mt-2 py-2 px-6 rounded-md text-center transition-all text-base text-color-secondary bg-transparent border secondary hover:border-green-500 hover:text-green-500"
                            >
                                {capitalize(translate('save_changes', language))}
                            </button>
                        </form>
                    )}

                    <button
                        onClick={handleEditToggle}
                        className={`mt-2 py-2 px-6 rounded-md text-center transition-all text-base text-white ${
                            editMode
                                ? 'bg-transparent border secondary hover:bg-transparent hover:text-red-500 hover:border-red-500'
                                : 'bg-transparent border secondary hover:text-color-primary-hover-text'
                        }`}
                    >
                        {editMode ? capitalize(translate('cancel', language)) : capitalize(translate('edit', language))}
                    </button>
                </div>
            </DefaultPanel>
        </>
    );
};

export default ProfilePage;
