import { Link } from 'react-router-dom';
import Links from './Links';
import translate from '../../utils/translate';
import { useLanguage } from '../../context/LanguageContext';

const DasboardNavigation = () => {
    const { language } = useLanguage();
    return (
        <nav className="flex flex-col gap-2 justify-center items-center text-lg text-color-primary pt-1">
            {Links.map(({ key, path }) => (
                <Link key={key} to={path} className="hover:text-color-primary-hover-text">
                    {translate(key, language)}
                </Link>
            ))}
        </nav>
    );
};

export default DasboardNavigation;
