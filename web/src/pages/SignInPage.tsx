import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DefaultPanel from '../components/utils/DefaultPanel';
import { capitalize } from '../utils/capitalizeString';
import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';
import { useNavigate } from 'react-router-dom';
import { validateSignnOut } from '../utils/validateSignInnOut';

const SignInPage = () => {
    const { language } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateSignnOut(email, password);
        if (validationError) {
            setError(translate(validationError, language));
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            // map Supabase error messages to translation keys
            const customErrorKeys: { [key: string]: string } = {
                'Invalid login credentials': 'error_invalid_credentials',
            };

            const errorKey = customErrorKeys[error.message] || 'error_unexpected';
            translate(errorKey, language);

            setError(translate(errorKey, language));
        } else {
            navigate('/');
        }
    };

    return (
        <DefaultPanel>
            <div className="flex flex-col gap-4 justify-center items-start">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate('sign_in', language))}</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2">
                        <label>{capitalize(translate('email', language))}</label>
                        <input
                            type="email"
                            placeholder={capitalize(translate('email', language))}
                            className="border p-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>{capitalize(translate('password', language))}</label>
                        <input
                            type="password"
                            placeholder={capitalize(translate('password', language))}
                            className="border p-2 w-full rounded-md bg-color-primary text-color-third placeholder-color-third text-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mt-2">{capitalize(error)}</p>}
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="w-1/2 mt-2 py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary"
                    >
                        {capitalize(translate('sign_in', language))}
                    </button>
                </form>
            </div>
        </DefaultPanel>
    );
};

export default SignInPage;
