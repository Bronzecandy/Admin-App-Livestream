import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer'; // Import component VideoPlayer
import VideoRow from './VideoRow'; // Import component VideoRow
import AddVideoForm from './AddVideoForm'; // Import component AddVideoForm

const VideoManager = () => {
    const [videos, setVideos] = useState([
        {
            id: 'video_001',
            title: 'Khám Phá Công Nghệ Mới',
            description: 'Video này giới thiệu về các công nghệ mới trong năm 2024.',
            duration: 'PT2H30M',
            format: 'MP4',
            size: '500MB',
            quality: '1080p',
            upload_time: '2024-10-20T15:30:00Z',
            url: '/videos/video1.mp4',
            uploader: {
                user_id: 'user_002',
                username: 'TechReviewer',
            },
        },
        {
            id: 'video_002',
            title: 'Hướng Dẫn Lập Trình React',
            description: 'Video hướng dẫn chi tiết về lập trình React cho người mới bắt đầu.',
            duration: 'PT1H45M',
            format: 'MP4',
            size: '300MB',
            quality: '720p',
            upload_time: '2024-10-19T14:00:00Z',
            url: '/videos/video2.mp4',
            uploader: {
                user_id: 'user_003',
                username: 'ReactMaster',
            },
        },
        {
            id: 'video_003',
            title: 'Tìm Hiểu Về AI',
            description: 'Video giải thích về trí tuệ nhân tạo và các ứng dụng của nó trong đời sống.',
            duration: 'PT2H',
            format: 'MP4',
            size: '450MB',
            quality: '1080p',
            upload_time: '2024-10-18T10:30:00Z',
            url: '/videos/video3.mp4',
            uploader: {
                user_id: 'user_004',
                username: 'AIGuru',
            },
        },
        {
            id: 'video_004',
            title: 'Lập Trình Python Căn Bản',
            description: 'Video giới thiệu về lập trình Python và các khái niệm cơ bản.',
            duration: 'PT2H15M',
            format: 'MP4',
            size: '400MB',
            quality: '1080p',
            upload_time: '2024-10-17T12:00:00Z',
            url: '/videos/video4.mp4',
            uploader: {
                user_id: 'user_005',
                username: 'PythonNinja',
            },
        },
        {
            id: 'video_005',
            title: 'Cách Thức Hoạt Động Của Blockchain',
            description: 'Video giải thích cách thức hoạt động của công nghệ blockchain.',
            duration: 'PT1H30M',
            format: 'MP4',
            size: '350MB',
            quality: '720p',
            upload_time: '2024-10-16T08:00:00Z',
            url: '/videos/video2.mp4',
            uploader: {
                user_id: 'user_006',
                username: 'BlockchainExpert',
            },
        },
    ]);

    const [playingVideo, setPlayingVideo] = useState(null);
    const [showForm, setShowForm] = useState(false); 
    const [editingVideo, setEditingVideo] = useState(null); 

    const editVideo = (updatedVideo) => {
        setVideos(videos.map(video => video.id === updatedVideo.id ? updatedVideo : video));
        setShowForm(false);
        setEditingVideo(null);
    };

    const deleteVideo = (id) => {
        setVideos(videos.filter(video => video.id !== id));
    };

    const handlePlayVideo = (video) => {
        setPlayingVideo(video);
    };

    const closeVideoPlayer = () => {
        setPlayingVideo(null);
    };

    const handleAddVideo = (newVideo) => {
        setVideos([...videos, newVideo]);
        setShowForm(false); // Đóng form sau khi thêm video
    };

    const openAddForm = () => {
        setEditingVideo(null); // Không có video để chỉnh sửa -> form thêm mới
        setShowForm(true);
    };

    const openEditForm = (video) => {
        setEditingVideo(video); // Gán video để chỉnh sửa
        setShowForm(true);
    };

    return (
        <div className="container mx-auto mt-8 p-5 bg-gray-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quản Lý Video</h2>

            {/* Nút Thêm mới */}
            <button
                className="bg-green-500 text-white px-4 py-2 rounded shadow mb-4"
                onClick={openAddForm} // Mở form thêm mới
            >
                Thêm mới
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-blue-500 text-white uppercase text-sm leading-normal">
                        <tr>
                            <th className="border px-6 py-3">Tiêu đề</th>
                            <th className="border px-6 py-3">Mô tả</th>
                            <th className="border px-6 py-3">Thời gian</th>
                            <th className="border px-6 py-3">Kích thước</th>
                            <th className="border px-6 py-3">Chất lượng</th>
                            <th className="border px-6 py-3">Thời gian tải lên</th>
                            <th className="border px-6 py-3">Xem Video</th>
                            <th className="border px-6 py-3">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {videos.map(video => (
                            <VideoRow
                                key={video.id}
                                video={video}
                                onEdit={() => openEditForm(video)} // Mở form chỉnh sửa
                                onDelete={deleteVideo}
                                onPlay={handlePlayVideo}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Hiển thị VideoPlayer khi có video đang được xem */}
            {playingVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <VideoPlayer video={playingVideo} onClose={closeVideoPlayer} />
                </div>
            )}

            {/* Hiển thị Form Thêm/Sửa Video */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">
                            {editingVideo ? 'Chỉnh Sửa Video' : 'Thêm Video Mới'}
                        </h3>
                        <AddVideoForm
                            onAdd={handleAddVideo}
                            onEdit={editVideo}
                            video={editingVideo} // Truyền video để chỉnh sửa
                        />
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
                            onClick={() => setShowForm(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoManager;
