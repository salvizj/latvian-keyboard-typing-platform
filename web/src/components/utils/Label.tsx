import React from 'react';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

type LabelProps = {
    text: string;
    htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ text, htmlFor }) => {
    const { language } = useLanguage();
    return (
        <label htmlFor={htmlFor} className="secondary-text font-md">
            {translate(text, language)}
        </label>
    );
};

export default Label;
