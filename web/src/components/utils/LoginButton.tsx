import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import Button from './Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    const { language } = useLanguage();
    return (
        <Button onClick={() => loginWithRedirect()} className="primary-text text-lg hover:primary-hover-text">
            {translate('login', language)}
        </Button>
    );
};

export default LoginButton;
