import { Link } from 'react-router-dom';

const LessonLinks = () => {
    const LessonCount = 54;
    const BaseUrl = '/lesson/';
    const links = [];

    for (let lessonNumber = 1; lessonNumber <= LessonCount; lessonNumber++) {
        links.push(
            <Link
                key={lessonNumber}
                className="border secondary primary-text bg-transparent w-16 h-16 flex justify-center items-center"
                to={`${BaseUrl}${lessonNumber}`}
            >
                {lessonNumber}
            </Link>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
            {links}
        </div>
    );
};

export default LessonLinks;
