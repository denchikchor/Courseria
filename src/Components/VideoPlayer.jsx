import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

export const VideoPlayer = (props) => {
    const videoRef = useRef(null);

    useEffect(() => {
        console.log(videoRef);
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

    return (
        <video
            src={props.src}
            ref={videoRef}
            controls
            width="300"
            height="200"
        ></video>
    );
};
