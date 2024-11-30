import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DefaultPanel from '../components/utils/DefaultPanel';
import { capitalize } from '../utils/capitalizeString';
import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { validateInput } from '../utils/validateInput';

const SignUpPage = () => {
    const { language } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateInput(email, password, confirmPassword);
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
            <h2>{capitalize(translate('sign_up', language))}</h2>

            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{capitalize(error)}</p>}
                <button
                    type="submit"
                    onClick={handleSignUp}
                    className="bg-transparent text-primary py-2 px-4 rounded-md text-center hover:opacity-90 transition-opacity text-base hover:text-color-primary-hover-text border secondary "
                >
                    {capitalize(translate('sign_up', language))}
                </button>
            </form>
        </DefaultPanel>
    );
};

export default SignUpPage;
