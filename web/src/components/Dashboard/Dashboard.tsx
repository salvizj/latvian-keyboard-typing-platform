import LanguageTogleButton from './LanguageToggleButton';
import ThemeTogleButton from './ThemeToggleButton';
import LogoutButton from '../user/SignOutButton';
import SignInButton from '../user/SignInButton';
import SignUpButton from '../user/SignUpButton';
import DashboardNavigation from './DashboardNavigation';
import KeyboardSettings from '../utils/KeyboardSettings';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type DashboardProps = {
    isMinimized: boolean;
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
            <div className={`flex flex-col h-full z-10 relative ${isMinimized ? 'pt-20' : ''}`}>
                {!isMinimized && (
                    <div className="px-4 py-6 border-b border-gray-700 flex flex-row items-center justify-start gap-2">
                        <LanguageTogleButton />
                        <ThemeTogleButton />
                    </div>
                )}

                <div className={`px-4 py-6 border-b border-gray-700 ${isMinimized ? 'items-center' : ''}`}>
                    {!isSignedIn && (
                        <div className={`flex ${isMinimized ? 'flex-col items-center' : 'flex-col'} gap-4`}>
                            {}
                            <SignUpButton isMinimized={isMinimized} />
                            <SignInButton isMinimized={isMinimized} />
                        </div>
                    )}
                    {isSignedIn && (
                        <div className={`flex ${isMinimized ? 'flex-col items-center' : 'flex-col'} gap-4`}>
                            {}
                            <LogoutButton isMinimized={isMinimized} />
                        </div>
                    )}
                </div>

                <div className="flex-1 px-4 py-6  ">
                    <div className={`flex flex-col ${isMinimized ? 'items-center' : ''} pt-6`}>
                        <DashboardNavigation isMinimized={isMinimized} />
                        <KeyboardSettings isMinimized={isMinimized} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
