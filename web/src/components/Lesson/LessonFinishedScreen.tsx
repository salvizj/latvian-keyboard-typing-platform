import { FaArrowRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';

type LessonFinishedProps = {
    setFinished: (finished: boolean) => void;
    restart: () => void;
};

const LessonFinishedScreen: React.FC<LessonFinishedProps> = ({ setFinished, restart }) => {
    const { id } = useParams<{ id: string }>();
    const lessonId = id ? parseInt(id, 10) : 1;
    const { language } = useLanguage();
    const LessonFinishedScreenTitle = capitalize(
        translate('lesson', language) + ' ' + translate('completed', language)
    );

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">{LessonFinishedScreenTitle}</h2>

                <div className="grid grid-cols-3 gap-4">
                    <Link
                        onClick={() => setFinished(false)}
                        to="/lessons"
                        className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6"
                    >
                        {translate('back_to_lessons', language)}
                    </Link>

                    <button
                        onClick={() => {
                            restart();
                            setFinished(false);
                        }}
                        className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6"
                    >
                        {translate('restart', language)}
                    </button>

                    <Link
                        to={`/lesson/${lessonId + 1}`}
                        onClick={() => setFinished(false)}
                        className="bg-transparent text-primary py-2 px-6 rounded-md text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary mt-6"
                    >
                        <FaArrowRight className="text-xl" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LessonFinishedScreen;
