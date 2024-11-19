import { Outlet } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';

const Layout = () => {
    return (
        <div className="flex flex-row h-screen">
            <main className="flex-1 flex flex-col justify-center items-center">
                <Outlet />
            </main>
            <aside className="h-full min-h-screen w-2/12 aside-bg">
                <Dashboard />
            </aside>
        </div>
    );
};

export default Layout;
