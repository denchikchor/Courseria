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
        setCurrentTime(videoRef.current.currentTime);
        localStorage.setItem(
            `videoProgress_${props.videoId}`,
            videoRef.current.currentTime
        );
    };

    // const videos = document.querySelectorAll('video');
    // for (const video of videos) {
    //     video.pause();
    // }

    return (
        <>
            {!videoLoaded && <PreloaderForVideo />}
            <video
                ref={videoRef}
                src={props.src}
                autoPlay={props.autoPlay}
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
            ></video>
        </>
    );
};
