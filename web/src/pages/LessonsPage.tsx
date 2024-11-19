import LessonLinks from '../components/LesonLinks';
import { capitalize } from '../utils/capitalize';
import translate from '../utils/translate';
const LessonsPage = () => {
    return (
        <>
            <h1 className="text-4xl primary-text">
                {capitalize(translate('lessons'))}
            </h1>
            <LessonLinks />
        </>
    );
};

export default LessonsPage;
