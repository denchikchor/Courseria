import { useState } from 'react';
import { VideoPlayer } from '../VideoPlayer';
import { Link } from 'react-router-dom';
import './LessonItem.scss';

function LessonItem(props) {
    const { id, title, lessonsCount, previewImageLink, rating, meta } = props;

    const [showVideo, setShowVideo] = useState(false);

    const handleMouseEnter = () => {
        setShowVideo(true);
    };

    const handleMouseLeave = () => {
        setShowVideo(false);
    };

    return (
        <div className="card">
            <div className="card-left-side">
                <div className="card-image">
                    <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {showVideo ? (
                            <div>
                                <VideoPlayer
                                    src={
                                        meta.courseVideoPreview.link
                                            ? meta.courseVideoPreview.link
                                            : null
                                    }
                                    width="300px"
                                    muted={true}
                                    autoPlay={false}
                                />
                            </div>
                        ) : (
                            <img
                                src={previewImageLink + '/cover.webp'}
                                alt={previewImageLink}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="card-content">
                <span className="card-title">{title}</span>
                <p>
                    <span>Number of lessons:</span>Number of lessons:{' '}
                    {lessonsCount}
                </p>
                <p>
                    <span>Rating: </span>
                    {rating}/5
                </p>
                <span>Skills: </span>
                {meta.skills ? (
                    <ul>
                        {meta.skills.map((skill) => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    ' unnecessary'
                )}
                <div className="card-action">
                    <Link to={`/lesson/${id}`} className="btn">
                        Open course
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { LessonItem };
