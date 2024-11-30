import { Link } from 'react-router-dom';
import Links from './Links';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';
import { FaBook, FaChartLine, FaGamepad, FaHistory, FaHome, FaKeyboard, FaTrophy, FaUser } from 'react-icons/fa';
import { capitalize } from '../../utils/capitalizeString';
import { useAuthStatus } from '../../hooks/useAuthStatus';

type DashboardNavigationProps = {
    isMinimized: boolean;
};

const DashboardNavigation = ({ isMinimized }: DashboardNavigationProps) => {
    const { language } = useLanguage();
    const { isSignedIn, loading } = useAuthStatus();

    if (loading) {
        return (
            <div>
                {translate('loading', language)}
                {'...'}
            </div>
        );
    }

    const getIcon = (key: string) => {
        switch (key) {
            case 'home':
                return <FaHome />;
            case 'profile':
                return <FaUser />;
            case 'statistics':
                return <FaChartLine />;
            case 'typing_test':
                return <FaKeyboard />;
            case 'typing_race':
                return <FaTrophy />;
            case 'lessons':
                return <FaBook />;
            case 'games':
                return <FaGamepad />;
            case 'history':
                return <FaHistory />;
            default:
                return null;
        }
    };

    return (
        <nav className="flex flex-col justify-center items-left text-lg text-color-primary gap-6">
            {Links.map(({ key, path, protected: isProtected }) => {
                if (isProtected && !isSignedIn) return null;

                return (
                    <Link
                        key={key}
                        to={path}
                        className="flex items-center justify-start gap-4 hover:text-color-primary-hover-text"
                    >
                        {getIcon(key)}
                        {!isMinimized && capitalize(translate(key, language))}
                    </Link>
                );
            })}
        </nav>
    );
};

export default DashboardNavigation;
