import { FaArrowRight } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';
import translate from '../../utils/translate';
import { capitalize } from '../../utils/capitalize';
import CompletionScreen from '../utils/CompletionScreen';
import { useLanguage } from '../../context/LanguageContext';

type LessonFinishedProps = {
    setFinished: (finished: boolean) => void;
    restart: () => void;
};

const LessonFinishedScreen: React.FC<LessonFinishedProps> = ({ setFinished, restart }) => {
    const { id } = useParams<{ id: string }>();
    const lessonId = id ? parseInt(id, 10) : 1;
    const { language } = useLanguage();
    const title = `${capitalize(translate('lesson', language))} ${capitalize(translate('completed', language))}`;

    const buttons = [
        {
            text: 'back_to_lessons',
            onClick: () => setFinished(false),
            styleClass: 'border',
        },
        {
            text: 'restart',
            onClick: () => {
                restart();
                setFinished(false);
            },
            styleClass: 'border',
        },
        {
            text: '',
            onClick: () => setFinished(false),
            styleClass: 'border flex items-center justify-center',
            customContent: <FaArrowRight className="text-xl" />,
            link: `/lesson/${lessonId + 1}`,
        },
    ];

    const formattedButtons = buttons.map(({ text, onClick, styleClass, customContent, link }) => {
        if (link) {
            return {
                text: '',
                onClick,
                styleClass,
                customContent: (
                    <Link to={link} className="flex items-center justify-center w-full h-full">
                        {customContent}
                    </Link>
                ),
            };
        }
        return {
            text: capitalize(translate(text, language)),
            onClick,
            styleClass,
        };
    });

    return <CompletionScreen title={title} buttons={formattedButtons} />;
};

export default LessonFinishedScreen;
