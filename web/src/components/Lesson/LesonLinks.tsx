import { Link } from 'react-router-dom';
import { hasLessonBeenCompleted } from '../../utils/lessonCompletion';
import { Lesson } from '../../types';

type LessonLinksProps = {
    lessons: Lesson[];
};

const LessonLinks = ({ lessons }: LessonLinksProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
            {lessons.map((lesson) => {
                const completedAlready = hasLessonBeenCompleted(lesson.lessonId);
                return (
                    <Link
                        key={lesson.lessonId}
                        className={`border secondary text-color-secondary w-16 h-16 flex justify-center items-center hover:text-color-primary-hover-text ${
                            completedAlready ? 'lesson-complete' : ''
                        }`}
                        to={`/lesson/${lesson.lessonId}`}
                    >
                        {lesson.lessonId}
                    </Link>
                );
            })}
        </div>
    );
};

export default LessonLinks;
