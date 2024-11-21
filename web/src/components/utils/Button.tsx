import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button', disabled = false }) => {
    return (
        <button onClick={onClick} className={`text-2xl ${className}`} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
