import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../../api';
import { Preloader } from '../../Components/Preloader/Preloader';
import { VideoPlayer } from '../../Components/VideoPlayer';
import { VideoPlayerCourse } from '../../Components/VideoPlayerCourse';
import './Lesson.scss';

function Lesson() {
    const [course, setCourse] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [selectedLessonId, setSelectedLessonId] = useState();

    const handleClick = (lessonId) => {
        setSelectedLessonId(lessonId);
    };

    const handleClose = () => {
        setSelectedLessonId();
    };

    useEffect(() => {
        getLessonById(id)
            .then((data) => {
                setCourse(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    return (
        <>
            {!course.id && loading ? (
                <Preloader />
            ) : (
                <div className="lesson">
                    <h1>{course.title}</h1>
                    {course.lessons[0].link ? (
                        <VideoPlayer
                            src={course.lessons[0].link}
                            controls={true}
                            muted={false}
                            autoPlay=""
                            poster={course.previewImageLink + '/cover.webp'}
                            className="main-lesson-video"
                            autostart="false"
                        />
                    ) : null}

                    <p>{course.description}</p>
                    <p>
                        Rating: <span className="text">{course.rating}/5</span>
                    </p>

                    <div className="courses">
                        {course.lessons ? (
                            <ul>
                                {course.lessons
                                    .sort((a, b) => a.order - b.order)
                                    .map((lesson) =>
                                        lesson.title ? (
                                            <li key={lesson.title}>
                                                {lesson.status ===
                                                'unlocked' ? (
                                                    <p>
                                                        {lesson.order}.{' '}
                                                        {lesson.title}
                                                    </p>
                                                ) : (
                                                    <p>
                                                        {lesson.order}.{' '}
                                                        {lesson.title} -{' '}
                                                        <span>
                                                            {lesson.status}
                                                        </span>
                                                    </p>
                                                )}
                                                {lesson.id ===
                                                    selectedLessonId &&
                                                lesson.status === 'unlocked' ? (
                                                    <div
                                                        className="video-overlay"
                                                        onClick={handleClose}
                                                    >
                                                        <div
                                                            className="video-box"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <div className="navbar">
                                                                <div>
                                                                    {
                                                                        lesson.order
                                                                    }
                                                                    .{' '}
                                                                    {
                                                                        lesson.title
                                                                    }
                                                                </div>
                                                                <button
                                                                    className="close-button"
                                                                    onClick={
                                                                        handleClose
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                            {lesson.link ? (
                                                                <VideoPlayerCourse
                                                                    src={
                                                                        lesson.link
                                                                    }
                                                                    controls={
                                                                        true
                                                                    }
                                                                    muted={
                                                                        false
                                                                    }
                                                                    className="lesson-video"
                                                                    videoid={
                                                                        lesson.id
                                                                    }
                                                                />
                                                            ) : null}

                                                            <p>
                                                                Press button
                                                                '&lt;' to
                                                                decrease
                                                                playback speed
                                                                by 0.25 or
                                                                '&gt;' to
                                                                increase
                                                                playback speed
                                                                by 0.25
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {lesson.link &&
                                                        lesson.status ===
                                                            'unlocked' ? (
                                                            <button
                                                                onClick={() =>
                                                                    handleClick(
                                                                        lesson.id
                                                                    )
                                                                }
                                                            >
                                                                Open lesson
                                                            </button>
                                                        ) : null}
                                                    </div>
                                                )}
                                            </li>
                                        ) : (
                                            <li key={lesson.id}>
                                                This lesson is locked
                                            </li>
                                        )
                                    )}
                            </ul>
                        ) : (
                            ' none'
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export { Lesson };
