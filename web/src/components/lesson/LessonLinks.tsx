import { Link } from 'react-router-dom';
import { Lesson } from '../../types';

type LessonLinksProps = {
    lessons: Lesson[];
    lessonCompletion: { [key: number]: boolean } | null;
};

const LessonLinks = ({ lessons, lessonCompletion }: LessonLinksProps) => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-12 gap-4 p-6 ">
            {lessons.map((lesson) => {
                const completedAlready = lessonCompletion ? lessonCompletion[lesson.lessonId] : false;
                return (
                    <Link
                        key={lesson.lessonId}
                        className={`border-color-primary hover:border-color-third text-color-secondary w-12 h-12 flex justify-center items-center hover:text-color-third-hover-text ${
                            completedAlready ? 'lesson-complete' : ''
                        }`}
                        to={`/lesson/${lesson.lessonId}`}
                        state={{ lesson }}
                        replace
                    >
                        {lesson.lessonId}
                    </Link>
                );
            })}
        </div>
    );
};

export default LessonLinks;
