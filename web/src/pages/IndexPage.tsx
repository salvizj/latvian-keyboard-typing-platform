import { useLanguage } from '../context/LanguageContext';
import translate from '../utils/translate';

const IndexPage = () => {
    const { language } = useLanguage();
    return (
        <div className="min-h-screen flex items-center justify-center text-color-primary">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{translate('index_page_h1', language)}</h1>
                <p className="text-lg">{translate('index_page_p', language)}</p>
            </div>
        </div>
    );
};

export default IndexPage;
