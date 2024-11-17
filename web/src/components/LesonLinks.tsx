import { Link } from 'react-router-dom';

const LessonLinks = () => {
    const LessonCount = 54;
    const BaseUrl = '/lessons/';
    const links = [];

    for (let lessonNumber = 1; lessonNumber <= LessonCount; lessonNumber++) {
        links.push(
            <div key={lessonNumber} className="border secondary bg-transparent">
                <Link to={`${BaseUrl}${lessonNumber}`}>
                    Lesson {lessonNumber}
                </Link>
            </div>
        );
    }

    return <div>{links}</div>;
};

export default LessonLinks;
