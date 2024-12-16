import React, { ReactNode } from 'react';

type DefaultPanelProps = {
    children: ReactNode;
    className?: string;
    width?: string;
    flexAlignment?: 'start' | 'center' | 'end';
};

const DefaultPanel: React.FC<DefaultPanelProps> = ({
    children,
    className = '',
    width = 'max-w-2xl',
    flexAlignment = 'center',
}) => {
    const alignmentClasses = `justify-${flexAlignment} items-${flexAlignment}`;

    return (
        <div className={`bg-black/50 flex ${alignmentClasses} w-full h-full ${className}`}>
            <div
                className={`bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full ${width} animate-in fade-in zoom-in duration-300`}
            >
                {children}
            </div>
        </div>
    );
};

export default DefaultPanel;
