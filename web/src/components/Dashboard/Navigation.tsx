import { Link } from 'react-router-dom';
import Links from './Links';
import translate from '../../utils/translate';

const Navigation = () => {
    return (
        <nav className="flex flex-col justify-center items-center text-2xl primary-text">
            {Links.map(({ key, path }) => (
                <Link key={key} to={path}>
                    {translate(key)}
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;
