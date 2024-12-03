import React, { ReactNode } from 'react';

type DefaultPanelProps = {
    children: ReactNode;
    className?: string;
    width?: string;
};

const DefaultPanel: React.FC<DefaultPanelProps> = ({ children, className = '', width = 'max-w-2xl' }) => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div
            className={`bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full ${width} animate-in fade-in zoom-in duration-300 absolute ${className}`}
        >
            {children}
        </div>
    </div>
);

export default DefaultPanel;
