import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../../api';
import { Preloader } from '../../Components/Preloader/Preloader';
import { VideoPlayer } from '../../Components/VideoPlayer';
import { VideoPlayerCourse } from '../../Components/VideoPlayerCourse';
import './Lesson.scss';

function Lesson() {
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const [selectedLessonId, setSelectedLessonId] = useState();

    const handleClick = (lessonId) => {
        setSelectedLessonId(lessonId);
    };

    const handleClose = () => {
        setSelectedLessonId();
    };

    useEffect(() => {
        getLessonById(id).then((data) => setCourse(data));
    }, [id]);

    // const videoRef = useRef(null);

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         if (event.code === 'Comma') {
    //             // Decrease playback speed by 0.25
    //             videoRef.current.playbackRate -= 0.25;
    //         } else if (event.code === 'Period') {
    //             // Increase playback speed by 0.25
    //             videoRef.current.playbackRate += 0.25;
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

    return (
        <>
            {!course.id ? (
                <Preloader />
            ) : (
                <div className="lesson">
                    <h1>{course.title}</h1>
                    <VideoPlayer
                        src={course.lessons[0].link}
                        controls={true}
                        muted={true}
                        autoPlay=""
                        poster={course.previewImageLink + '/cover.webp'}
                        className="main-lesson-video"
                        autostart="false"
                    />
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
                                        lesson.title && lesson.link ? (
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
                                                    <div className="video-overlay">
                                                        <div className="video-box ">
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
                                                            <VideoPlayerCourse
                                                                src={
                                                                    lesson.link
                                                                }
                                                                controls={true}
                                                                // width="500px"
                                                                muted={false}
                                                                autoPlay={false}
                                                                className="lesson-video"
                                                                videoId={
                                                                    lesson.id
                                                                }
                                                            />
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
                                                        <button
                                                            onClick={() =>
                                                                handleClick(
                                                                    lesson.id
                                                                )
                                                            }
                                                        >
                                                            Open lesson
                                                        </button>
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
