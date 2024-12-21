import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BREAKPOINT = 1280;

const Layout = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isSmall = window.innerWidth < BREAKPOINT;
            setIsSmallScreen(isSmall);
            if (isSmall) {
                setIsMinimized(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleAside = () => {
        if (!isSmallScreen) {
            setIsMinimized(!isMinimized);
        }
    };

    return (
        <div className="flex h-full w-full">
            <main className={`transition-all ${isMinimized || isSmallScreen ? 'w-[95%]' : 'w-[85%]'} `}>
                <Outlet />
            </main>
            <aside
                className={`h-full min-h-screen transition-all ${
                    isMinimized ? 'w-[5%]' : 'w-[15%]'
                } bg-color-third sticky top-0 min-w-[5rem]`}
            >
                {!isSmallScreen && (
                    <button
                        className={`text-color-primary rounded hover:bg-primary flex justify-center items-center text-3xl z-50 absolute transition-all top-6 left-8`}
                        onClick={toggleAside}
                    >
                        {isMinimized ? <FiChevronLeft /> : <FiChevronRight />}
                    </button>
                )}
                <Dashboard isMinimized={isMinimized} setIsMinimized={setIsMinimized} />
            </aside>
        </div>
    );
};

export default Layout;
