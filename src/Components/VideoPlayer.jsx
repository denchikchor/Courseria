import Hls from 'hls.js';
import { useState, useEffect, useRef } from 'react';
import { PreloaderForVideo } from '../Components/PreloaderForVideo/PreloaderForVideo';

export const VideoPlayer = (props) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const { current: videoElement } = videoRef;
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(props.src);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    if (props.autoPlay) {
                        videoElement.play();
                    }
                });
            } else if (videoElement.canPlayType('application/x-mpegURL')) {
                videoElement.src = props.src;
                videoElement.addEventListener('loadedmetadata', () => {
                    videoElement.play();
                });
            }
        }
    }, [props.src, props.autoPlay]);

    const [videoLoaded, setVideoLoaded] = useState(false);

    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

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
                    poster: {
                        objectFit: 'cover',
                    },
                }}
                poster={props.poster}
                className={props.className}
            ></video>
        </>
    );
};
