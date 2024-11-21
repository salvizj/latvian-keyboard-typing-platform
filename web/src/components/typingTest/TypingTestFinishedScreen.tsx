import Button from '../utils/Button';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';

type TypingTestFinishedProps = {
    setFinished: (finished: boolean) => void;
    restart: () => void;
};

const TyingTestFinishedScreen: React.FC<TypingTestFinishedProps> = ({ setFinished, restart }) => {
    const { language } = useLanguage();
    const TypingTestFinishedScreenTitle = 'good job';

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{TypingTestFinishedScreenTitle}</h2>
                <Button
                    onClick={() => {
                        restart();
                        setFinished(false);
                    }}
                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6"
                >
                    {translate('restart', language)}
                </Button>
            </div>
        </div>
    );
};

export default TyingTestFinishedScreen;
