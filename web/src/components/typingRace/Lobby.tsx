import { useLanguage } from '../../context/LanguageContext';
import { capitalize } from '../../utils/capitalize';
import translate from '../../utils/translate';

type LobbyProps = {
    setRaceStart: (start: boolean) => void;
    title: string;
};

const Lobby: React.FC<LobbyProps> = ({ setRaceStart, title }) => {
    const { language } = useLanguage();

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            {' '}
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{capitalize(translate(title, language))}</h2>
                <button
                    className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-lg hover:third-hover border secondary"
                    onClick={() => setRaceStart(true)}
                >
                    {capitalize(translate('start_typing_race', language))}
                </button>
            </div>
        </div>
    );
};

export default Lobby;
