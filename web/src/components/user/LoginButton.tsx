import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

const Loginbutton = () => {
    const { loginWithRedirect } = useAuth0();
    const { language } = useLanguage();
    return (
        <button onClick={() => loginWithRedirect()} className="primary-text text-lg hover:primary-hover-text">
            {translate('login', language)}
        </button>
    );
};

export default Loginbutton;
