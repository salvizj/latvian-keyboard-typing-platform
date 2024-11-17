import React, { KeyboardEvent } from 'react';

type InputProps = {
    id: string;
    type: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    required?: boolean;
};

const Input: React.FC<InputProps> = ({
    id,
    type,
    value = '',
    onChange,
    placeholder,
    required,
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            return false;
        }
    };

    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onKeyDown={handleKeyDown}
            className="bg-secondary border border-primary rounded-sm p-2 w-full text-xl text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
        />
    );
};

export default Input;
