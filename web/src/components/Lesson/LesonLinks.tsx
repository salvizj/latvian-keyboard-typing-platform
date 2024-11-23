import { Link } from 'react-router-dom';
import { isLessonComplete } from '../../utils/lessonCompletion';

const LessonLinks = () => {
    const LessonCount = 54;
    const BaseUrl = '/lesson/';
    const links = [];

    for (let lessonNumber = 1; lessonNumber <= LessonCount; lessonNumber++) {
        const completedAlready = isLessonComplete(lessonNumber);
        links.push(
            <Link
                key={lessonNumber}
                className={`border secondary text-color-secondary w-16 h-16 flex justify-center items-center hover:text-color-primary-hover-text ${completedAlready ? 'lesson-complete' : ''}`}
                to={`${BaseUrl}${lessonNumber}`}
            >
                {lessonNumber}
            </Link>
        );
    }

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">{links}</div>;
};

export default LessonLinks;
