import { useAuth0 } from '@auth0/auth0-react';
import Button from './utils/Button';
import translate from '../utils/translate';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button onClick={() => loginWithRedirect()} className="primary-text ">
            {translate('login')}
        </Button>
    );
};

export default LoginButton;
