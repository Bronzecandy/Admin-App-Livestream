import React from 'react';
import HLSPlayer from './../VideoCategories/HLSPlayer ';

const VideoPlayer = ({ video, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 border z-50">
            <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
                >
                    <span className="text-md p-4">Đóng</span>
                </button>
                <h3 className="text-xl text-white mb-2 text-center font-semibold">Phát Video: {video.title}</h3>
                <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
                    {video.videoUrl ? (
                        <HLSPlayer src={video.videoUrl}/>
                    ) : (
                     <h1>Không có</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
