import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer'; 
import VideoRow from './VideoRow'; 
import AddVideoForm from './AddVideoForm';
import axios from 'axios';

const VideoManager = () => {
    const [videos, setVideos] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(videos.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE';
    useEffect(() => {
        axios.get('https://social-media-z5a2.onrender.com/api/videos/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setVideos(response.data.videos);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
    
    const openEditForm = (video) => {
        setEditingVideo(video); 
        setShowForm(true);
    };
  
    const editVideo = async (updatedVideo) => {
        const formData = new FormData();
        formData.append('title', updatedVideo.title);
        formData.append('description', updatedVideo.description);
        updatedVideo.categoryIds.forEach((id, index) => {
            formData.append(`categoryIds[${index}]`, id);
        });
        formData.append('enumMode', updatedVideo.enumMode);
        if (typeof updatedVideo.thumbnailUrl === 'string' && updatedVideo.thumbnailUrl) {
            const response = await fetch(updatedVideo.thumbnailUrl, { mode: 'cors' });
            const blob = await response.blob();
            formData.append('videoThumbnail', blob, 'thumbnail.jpg');
        } else if (updatedVideo.thumbnailUrl instanceof File) {
            formData.append('videoThumbnail', updatedVideo.thumbnailUrl);
        }

        axios.patch(`https://social-media-z5a2.onrender.com/api/videos/${updatedVideo.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('Video updated:', response.data);
                window.location.reload(); 
            })
            .catch(error => {
                console.error('Error updating video:', error);
            });
    };



    return (
        <div className="container mx-auto flex flex-col gap-4 bg-white p-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 border rounded-lg"
                    />
                    <button className="px-4 py-2 border rounded-lg">Filters</button>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-[#f7f9fc] text-[#64748B] text-center">
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Thumbnail</th>
                            <th className="px-4 py-2">Uploaded</th>
                            <th className="px-4 py-2">Views</th>
                            <th className="px-4 py-2">Mode</th>
                            <th className="px-4 py-2">Upload Time</th>
                            <th className="px-4 py-2">Watch Videos</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>

                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {videos.length > 0 ? (
                            videos.map((video) => (
                                <VideoRow
                                    key={video._id}
                                    video={video}
                                    onEdit={() => openEditForm(video)}
                                    onDelete={deleteVideo}
                                    onPlay={handlePlayVideo}
                                />
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 text-center" colSpan="5">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>


                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center space-x-2">
                        <span>Results per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="border rounded-lg px-2 py-1"
                        >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {pages.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1 rounded-lg ${p === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {playingVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <VideoPlayer video={playingVideo} onClose={closeVideoPlayer} />
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">
                           Update Video
                        </h3>
                        <AddVideoForm
                            onEdit={editVideo}
                            video={editingVideo}
                            setShowForm={setShowForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoManager;
