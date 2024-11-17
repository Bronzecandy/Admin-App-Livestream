import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (Hls.isSupported() && src) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                videoRef.current.play();
            });

            return () => {
                hls.destroy();
            };
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support for Safari
            videoRef.current.src = src;
            videoRef.current.addEventListener('loadedmetadata', () => {
                videoRef.current.play();
            });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default HLSPlayer;
