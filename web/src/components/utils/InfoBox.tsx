import React, { ReactNode } from 'react';

interface InfoBoxProps {
    children: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ children }) => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-color-third text-color-primary p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
            {children}
        </div>
    </div>
);

export default InfoBox;
