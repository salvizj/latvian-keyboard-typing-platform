import LanguageToggleButton from './LanguageToggleButton';
import ThemeToggleButton from './ThemeToggleButton';
import LogoutButton from '../user/SignOutButton';
import SignInButton from '../user/SignInButton';
import SignUpButton from '../user/SignUpButton';
import DashboardNavigation from './DashboardNavigation';
import KeyboardSettings from '../utils/KeyboardSettings';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import useAuthStatus from '../../hooks/useAuthStatus';

type DashboardProps = {
    isMinimized: boolean;
    setIsMinimized: (isMinimized: boolean) => void;
};

const Dashboard = ({ isMinimized }: DashboardProps) => {
    const { isSignedIn, loading } = useAuthStatus();
    const { language } = useLanguage();

    if (loading) {
        return (
            <div>
                {translate('loading', language)}
                {'...'}
            </div>
        );
    }
    return (
        <>
            <div
                className={`flex flex-col justify-center items-center w-full h-full z-10 relative ${isMinimized ? 'pt-20' : ''}`}
            >
                {!isMinimized && (
                    <div className="px-4 py-6 border-b border-gray-700 flex flex-row gap-2 justify-center w-full">
                        <LanguageToggleButton />
                        <ThemeToggleButton />
                    </div>
                )}
                <div
                    className={`flex flex-1 flex-col mt-4 gap-2 ${isMinimized ? 'w-full items-center' : 'w-1/2 items-start'}`}
                >
                    {!isSignedIn && (
                        <>
                            <SignUpButton isMinimized={isMinimized} />
                            <SignInButton isMinimized={isMinimized} />
                        </>
                    )}
                    {isSignedIn && (
                        <>
                            <LogoutButton isMinimized={isMinimized} />
                        </>
                    )}
                </div>

                <div className="flex-1 px-4 py-6 justify-center">
                    <div className="flex flex-col pt-6 sticky top-0 flex-grow">
                        <DashboardNavigation isMinimized={isMinimized} />
                        <KeyboardSettings isMinimized={isMinimized} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
