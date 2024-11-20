import { useAuth0 } from '@auth0/auth0-react';
import Button from './utils/Button';
import translate from '../utils/transalte';
import { useLanguage } from '../context/LanguageContext';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { language } = useLanguage();
    return (
        <Button
            onClick={() => loginWithRedirect()}
            className="primary-text text-lg"
        >
            {translate('login', language)}
        </Button>
    );
};

export default LoginButton;
