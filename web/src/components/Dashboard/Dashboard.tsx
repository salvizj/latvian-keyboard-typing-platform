import LanguageTogleButton from '../language/LanguageToggleButton';
import ThemeTogleButton from '../theme/ThemeToggleButton';
import LoginButton from '../user/LoginButton';
import DashboardNavigation from './DashboardNavigation';

const Dashboard = () => {
    return (
        <div className="relative z-10 flex flex-col gap-10">
            <div className="flex justify-center sticky gap-4 pt-10 ">
                <LanguageTogleButton />
                <ThemeTogleButton />
            </div>
            <div className="flex flex-col">
                <LoginButton />
                <DashboardNavigation />
            </div>
        </div>
    );
};

export default Dashboard;
