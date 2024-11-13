import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentTable from './CommentTable';

const CommentManagement = () => {
    const [videos, setVideos] = useState([]);
    const [comments, setComments] = useState({});
    const [filteredComments, setFilteredComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedVideoId, setSelectedVideoId] = useState('');

    const sensitiveWords = ['offensive', 'swearing', 'stupid', 'crazy', 'bullshit', 'fuck', 'to la', 'ngu'];
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE';

    useEffect(() => {
        fetchVideos();
    }, [token]);

    const fetchVideos = async () => {
        try {
            const response = await axios.get('https://social-media-z5a2.onrender.com/api/videos/?size=100&page=1&sortBy=date&order=descending', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setVideos(response.data.videos);

            const commentsPromises = response.data.videos.map(video => fetchCommentsForVideo(video._id, video.title));
            const allComments = await Promise.all(commentsPromises);

            const mergedComments = allComments.flat();
            setComments(prevComments => ({
                ...prevComments,
                ...Object.fromEntries(response.data.videos.map((video, index) => [video._id, allComments[index]]))
            }));
            setFilteredComments(mergedComments);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching videos or comments:', error);
            setError('Error fetching videos or comments');
            setLoading(false);
        }
    };

    const fetchCommentsForVideo = async (videoId, videoTitle) => {
        try {
            const response = await axios.get(`https://social-media-z5a2.onrender.com/api/comments/video/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.comments.map(comment => {
                const isSensitive = sensitiveWords.some(word => comment.content.toLowerCase().includes(word));
                return { ...comment, status: isSensitive ? 'rejected' : 'approved', videoId, videoTitle };
            });
        } catch (error) {
            console.error('Error fetching comments for video:', videoId, error);
            return [];
        }
    };

    const handleViewComment = (comment) => {
        setSelectedComment(comment);
        const relatedVideo = videos.find(video => video._id === comment.videoId);
        setSelectedVideo(relatedVideo);
    };

    const closeModal = () => {
        setSelectedComment(null);
        setSelectedVideo(null);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
        applyFilters(e.target.value, selectedVideoId);
    };

    const handleVideoChange = (e) => {
        setSelectedVideoId(e.target.value);
        applyFilters(selectedStatus, e.target.value);
    };

    const applyFilters = (status, videoId) => {
        const filtered = Object.values(comments)
            .flat()
            .filter(comment => 
                (status ? comment.status === status : true) && 
                (videoId ? comment.videoId === videoId : true)
            );
        setFilteredComments(filtered);
    };

    const refreshComments = async () => {
        setLoading(true);
        await fetchVideos();
    };

    if (loading) return <p>Loading videos and comments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto mt-8 p-5 bg-gray-100 shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-semibold">Comments</h1>
            </div>

            <div className="flex gap-4 mb-4">
    <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="w-full border p-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="">All Statuses</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
    </select>

    <select
        value={selectedVideoId}
        onChange={handleVideoChange}
        className="w-full border p-2 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="">All Videos</option>
        {videos.map(video => (
            <option key={video._id} value={video._id}>{video.title}</option>
        ))}
    </select>
</div>


            <CommentTable
                filteredComments={filteredComments}
                handleViewComment={handleViewComment}
                getStatusClass={(status) => (status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}
                refreshComments={refreshComments}
            />

            {selectedComment && selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-4/5 overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Comment and Video Details</h3>

                        <div className="space-y-4">
                            <div className="border-2 border-gray-400 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Comment Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Username:</strong> {selectedComment.user?.fullName}</p>
                                    <p><strong>User ID:</strong> {selectedComment.user?._id}</p>
                                    <p><strong>Content:</strong> {selectedComment.content}</p>
                                    <p>
                                        <strong>Status:</strong>
                                        <span className={`ml-2 px-2 py-1 rounded ${selectedComment.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {selectedComment.status}
                                        </span>
                                    </p>
                                    <p><strong>Time:</strong> {new Date(selectedComment.dateCreated).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="border-2 border-gray-400 p-4 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Video Details</h4>
                                <p className="mb-4"><strong>Live Stream ID:</strong> {selectedVideo._id}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <p><strong>Title:</strong> {selectedVideo.title}</p>
                                    <p><strong>Description:</strong> {selectedVideo.description}</p>
                                    <p><strong>Views:</strong> {selectedVideo.numOfViews}</p>
                                </div>
                                <div className="mt-4">
                                    <img src={selectedVideo.thumbnailUrl} alt={selectedVideo.title} className="w-full h-auto rounded-lg shadow-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentManagement;
