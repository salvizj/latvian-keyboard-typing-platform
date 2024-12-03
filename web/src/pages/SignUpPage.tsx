import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DefaultPanel from '../components/utils/DefaultPanel';
import { capitalize } from '../utils/capitalizeString';
import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { validateSignnOut } from '../utils/validateSignInnOut';

const SignUpPage = () => {
    const { language } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateSignnOut(email, password, confirmPassword);
        if (validationError) {
            setError(translate(validationError, language));
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            // map Supabase error messages to translation keys
            const customErrorKeys: { [key: string]: string } = {
                'User already registered': 'error_user_already_registered',
            };

            const errorKey = customErrorKeys[error.message] || 'error_unexpected';
            setError(translate(errorKey, language));
        } else {
            navigate('/');
        }
    };

    return (
        <DefaultPanel>
            <div className="flex flex-col gap-4 justify-center items-start">
                <h1 className="text-3xl font-bold mb-8 text-center">{capitalize(translate('sign_up', language))}</h1>
                <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-full">
                    <label>{capitalize(translate('email', language))}</label>
                    <input
                        type="email"
                        placeholder={capitalize(translate('email', language))}
                        value={email}
                        className="border p-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>{capitalize(translate('password', language))}</label>
                    <input
                        className="border p-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                        type="password"
                        placeholder={capitalize(translate('password', language))}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>{capitalize(translate('confirm_password', language))}</label>
                    <input
                        className="border p-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                        type="password"
                        placeholder={capitalize(translate('confirm_password', language))}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 mt-2">{capitalize(error)}</p>}
                    <button
                        type="submit"
                        onClick={handleSignUp}
                        className="w-1/2 mt-2 py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary "
                    >
                        {capitalize(translate('sign_up', language))}
                    </button>
                </form>
            </div>
        </DefaultPanel>
    );
};

export default SignUpPage;
