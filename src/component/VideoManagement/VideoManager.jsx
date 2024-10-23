import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer'; 
import VideoRow from './VideoRow'; 
import AddVideoForm from './AddVideoForm';
import axios from 'axios';

const VideoManager = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios.get('https://671893417fc4c5ff8f4a0505.mockapi.io/videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [playingVideo, setPlayingVideo] = useState(null);
    const [showForm, setShowForm] = useState(false); 
    const [editingVideo, setEditingVideo] = useState(null); 


    const deleteVideo = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa video này không?")) {
            axios.delete(`https://671893417fc4c5ff8f4a0505.mockapi.io/videos/${id}`)
                .then(() => {
                    setVideos(videos.filter(video => video.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting video:', error);
                });
        }
    };

    const handlePlayVideo = (video) => {
        setPlayingVideo(video);
    };

    const closeVideoPlayer = () => {
        setPlayingVideo(null);
    };
    const openAddForm = () => {
        setEditingVideo(null);
        setShowForm(true);
    };
    const openEditForm = (video) => {
        setEditingVideo(video); // Gán video để chỉnh sửa
        setShowForm(true);
    };
    const handleAddVideo = (newVideo) => {
        axios.post('https://671893417fc4c5ff8f4a0505.mockapi.io/videos', newVideo)
            .then(response => {
                setVideos([...videos, response.data]); 
                setShowForm(false); 
            })
            .catch(error => {
                console.error('Error adding video:', error);
            });
    };

    const editVideo = (updatedVideo) => {
        axios.put(`https://671893417fc4c5ff8f4a0505.mockapi.io/videos/${updatedVideo.id}`, updatedVideo)
            .then(response => {
                setVideos(videos.map(video => video.id === updatedVideo.id ? response.data : video));
                setShowForm(false);
                setEditingVideo(null);
            })
            .catch(error => {
                console.error('Error updating video:', error);
            });
    };

   
   

    return (
        <div className="container mx-auto flex flex-col gap-4 bg-white p-8">
            <div className='flex justify-end'>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={openAddForm} // Mở form thêm mới
                >
                    Thêm mới
                </button>
            </div>
           

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white  table-auto ">
                    <thead >
                        <tr className='bg-[#f7f9fc] text-[#64748B] text-center'>
                            <th className="px-4 py-2">Tiêu đề</th>
                            <th className="px-4 py-2">Mô tả</th>
                            <th className="px-4 py-2">Thời gian</th>
                            <th className="px-4 py-2">Kích thước</th>
                            <th className="px-4 py-2">Chất lượng</th>
                            <th className="px-4 py-2">Thời gian tải lên</th>
                            <th className="px-4 py-2">Xem Video</th>
                            <th className="px-4 py-2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        { videos.length>0?(videos.map(video => (
                            <VideoRow
                                key={video.id}
                                video={video}
                                onEdit={() => openEditForm(video)} // Mở form chỉnh sửa
                                onDelete={deleteVideo}
                                onPlay={handlePlayVideo}
                            />
                        ))): (
                            <tr>
                                <td className="px-4 py-2" colSpan="5">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {playingVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <VideoPlayer video={playingVideo} onClose={closeVideoPlayer} />
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                        <div className='flex justify-end'>
                            <button
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
                                onClick={() => setShowForm(false)}
                            >
                                Đóng
                            </button>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">
                            {editingVideo ? 'Chỉnh Sửa Video' : 'Thêm Video Mới'}
                        </h3>
                        <AddVideoForm
                            onAdd={handleAddVideo}
                            onEdit={editVideo}
                            video={editingVideo} 
                        />
                       
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoManager;
