import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import LanguageTogleButton from '../language/LanguageToggleButton';
import ThemeTogleButton from '../theme/ThemeToggleButton';
import LogoutButton from '../user/SignOutBtn';
import SignInButton from '../user/SignInBtn';
import SignUpButton from '../user/SignUpBtn';
import DashboardNavigation from './DashboardNavigation';
import KeyboardSettings from '../utils/KeyboardSettings';
import { useState } from 'react';
import { capitalize } from '../../utils/capitalize';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { FaCog } from 'react-icons/fa';

const Dashboard = () => {
    const [close, setClose] = useState(true);
    const { language } = useLanguage();
    return (
        <div className="relative z-10 flex flex-col gap-10">
            <div className="flex flex-row justify-center items-center sticky gap-4 pt-10 ">
                <LanguageTogleButton />
                <ThemeTogleButton />
                <div className="flex flex-col gap-2">
                    <SignedOut>
                        <SignUpButton />
                        <SignInButton />
                    </SignedOut>
                </div>

                <SignedIn>
                    <LogoutButton />
                    <UserButton />
                </SignedIn>
            </div>
            <div className="flex flex-col justify-center items-center">
                <DashboardNavigation />
                <button
                    className="text-color-primary flex flex-row-reverse gap-4 justify-center items-center text-lg mt-4 hover:text-color-primary-hover-text"
                    onClick={() => (close ? setClose(false) : setClose(true))}
                >
                    {capitalize(translate('keyboard_settings', language))}
                    <FaCog />
                </button>

                {close === false && <KeyboardSettings setClose={setClose} />}
            </div>
        </div>
    );
};

export default Dashboard;
