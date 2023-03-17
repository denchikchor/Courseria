import Hls from 'hls.js';
import { useState, useEffect, useRef } from 'react';
import { PreloaderForVideo } from './PreloaderForVideo/PreloaderForVideo';

export const VideoPlayerCourse = (props) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const { current: videoElement } = videoRef;
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(props.src);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoElement.play();
                });
            } else if (videoElement.canPlayType('application/x-mpegURL')) {
                videoElement.src = props.src;
                videoElement.addEventListener('loadedmetadata', () => {
                    videoElement.play();
                });
            }
        }
    }, [props.src]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Comma') {
                // Decrease playback speed by 0.25
                videoRef.current.playbackRate -= 0.25;
            } else if (event.code === 'Period') {
                // Increase playback speed by 0.25
                videoRef.current.playbackRate += 0.25;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };
    // eslint-disable-next-line
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const savedProgress = localStorage.getItem(
            `videoProgress_${props.videoId}`
        );
        if (savedProgress) {
            videoRef.current.currentTime = parseFloat(savedProgress);
            setCurrentTime(parseFloat(savedProgress));
        }
    }, [videoRef, props.videoId]);

    const handleTimeUpdate = () => {
        if (videoRef.current.ended) {
            videoRef.current.currentTime = 0;
            localStorage.setItem(`videoProgress_${props.videoId}`, '0');
            setCurrentTime(0);
        } else {
            setCurrentTime(videoRef.current.currentTime);
            localStorage.setItem(
                `videoProgress_${props.videoId}`,
                videoRef.current.currentTime
            );
        }
    };

    // const videos = document.querySelectorAll('video');
    // for (const video of videos) {
    //     video.pause();
    // }

    const [isPIPActive, setIsPIPActive] = useState(false);

    useEffect(() => {
        const video = document.getElementById('video');
        const pipButton = document.getElementById('pipButton');

        if ('pictureInPictureEnabled' in document) {
            pipButton.classList.remove('hidden');
            pipButton.disabled = false;

            pipButton.addEventListener('click', () => {
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture().catch((error) => {
                        // Error handling
                    });
                    setIsPIPActive(false);
                } else {
                    video.requestPictureInPicture().catch((error) => {
                        // Error handling
                    });
                    setIsPIPActive(true);
                }
            });

            video.addEventListener('enterpictureinpicture', () => {
                setIsPIPActive(true);
            });

            video.addEventListener('leavepictureinpicture', () => {
                setIsPIPActive(false);
            });
        }
    }, []);

    return (
        <>
            {!videoLoaded && <PreloaderForVideo />}
            <video
                ref={videoRef}
                src={props.src}
                muted={props.muted}
                controls={props.controls}
                width={props.width}
                onLoadedData={handleVideoLoaded}
                style={{
                    display: videoLoaded ? 'block' : 'none',
                    borderRadius: '15px',
                }}
                poster={props.poster}
                className={props.className}
                onTimeUpdate={handleTimeUpdate}
                videoId={props.videoId}
                id="video"
            ></video>
            <button
                id="pipButton"
                disabled
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
                onClick={() => {
                    if (isPIPActive) {
                        document.exitPictureInPicture();
                        setIsPIPActive(false);
                    } else {
                        document
                            .getElementById('video')
                            .requestPictureInPicture();
                        setIsPIPActive(true);
                    }
                }}
            >
                {isPIPActive
                    ? 'Exit Picture-in-Picture mode'
                    : 'Enter Picture-in-Picture mode'}
            </button>
        </>
    );
};
