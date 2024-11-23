import { Outlet } from 'react-router-dom';
import Dashboard from '../../components/dashboard/Dashboard';

const Layout = () => {
    return (
        <div className="flex flex-row h-screen">
            <main className="flex-1 h-full min-h-screen">
                <Outlet />
            </main>
            <aside className="h-full min-h-screen w-2/12 bg-color-third">
                <Dashboard />
            </aside>
        </div>
    );
};

export default Layout;
