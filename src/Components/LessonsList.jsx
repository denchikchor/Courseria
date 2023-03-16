import { LessonItem } from './LessonItem/LessonItem';

function LessonsList({ lessons = [] }) {
    return (
        <div className="list">
            {lessons.map((el) => (
                <LessonItem key={el.id} {...el} />
            ))}
        </div>
    );
}

export { LessonsList };
