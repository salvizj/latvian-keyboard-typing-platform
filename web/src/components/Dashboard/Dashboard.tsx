import LanguageTogleButton from '../utils/LanguageToggleButton';
import LoginButton from '../utils/LoginButton';
import ThemeTogleButton from '../utils/ThemeToggleButton';
import Navigation from './Navigation';

const Dashboard = () => {
    return (
        <div className="relative z-10 flex flex-col gap-10">
            <div className="flex justify-center sticky gap-4 pt-10 ">
                <LanguageTogleButton />
                <ThemeTogleButton />
            </div>
            <div className="flex flex-col">
                <LoginButton />
                <Navigation />
            </div>
        </div>
    );
};

export default Dashboard;
