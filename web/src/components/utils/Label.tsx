import React from 'react';
import translate from '../../utils/translate';

type LabelProps = {
    text: string;
    htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className="secondary-text font-md">
            {translate(text)}
        </label>
    );
};

export default Label;
