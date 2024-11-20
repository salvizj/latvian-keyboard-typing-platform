import { FaArrowRight } from 'react-icons/fa';
import Button from '../utils/Button';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import translate from '../../utils/transalte';
import { capitalize } from '../../utils/capitalize';

type LessonFinishedProps = {
    finished: boolean;
    setFinished: (finished: boolean) => void;
    restartLesson: () => void;
};

const LessonFinishedScreen: React.FC<LessonFinishedProps> = ({
    finished,
    setFinished,
    restartLesson,
}) => {
    const { id } = useParams<{ id: string }>();
    const lessonId = id ? parseInt(id, 10) : 1;
    const { language } = useLanguage();
    const LessonFinishedScreenTitle = capitalize(
        translate('lesson', language) + ' ' + translate('completed', language)
    );

    if (!finished || !id) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="third-bg primary-text p-8 rounded-xl shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    {LessonFinishedScreenTitle}
                </h2>

                <div className="grid grid-cols-3 gap-4">
                    <Link
                        onClick={() => setFinished(false)}
                        to="/lessons"
                        className="bg-transparent text-primary py-4 px-6 rounded-lg text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary"
                    >
                        {translate('back_to_lessons', language)}
                    </Link>

                    <Button
                        onClick={() => {
                            restartLesson();
                            setFinished(false);
                        }}
                        className="bg-transparent text-primary py-4 px-6 rounded-lg text-center hover:opacity-90 transition-opacity text-xl hover:third-hover border secondary"
                    >
                        {translate('restart', language)}
                    </Button>

                    <Link
                        to={`/lesson/${lessonId + 1}`}
                        onClick={() => setFinished(false)}
                        className="bg-transparent secondary-bg text-primary py-4 px-6 rounded-lg flex items-center justify-center keyboard-border hover:opacity-90 transition-opacity hover:third-hover border secondary"
                    >
                        <FaArrowRight className="text-xl" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LessonFinishedScreen;
