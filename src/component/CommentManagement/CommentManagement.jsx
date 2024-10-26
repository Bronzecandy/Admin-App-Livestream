// CommentManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentTable from './CommentTable';

const CommentManagement = () => {
    const [comments, setComments] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [streamIdFilter, setStreamIdFilter] = useState('all');
    const [commentToDelete, setCommentToDelete] = useState(null);

    const sensitiveWords = ['offensive', 'swearing', 'stupid', 'crazy', 'bullshit', 'fuck', "ngu"];

    // Gọi API để lấy dữ liệu khi component được tải
    useEffect(() => {
        axios.get('https://671894f07fc4c5ff8f4a0d5d.mockapi.io/api/cmt')
            .then((response) => {
                const updatedComments = response.data.map(comment => {
                    const isSensitive = sensitiveWords.some(word => comment.comment.toLowerCase().includes(word));
                    return { ...comment, status: isSensitive ? 'rejected' : 'approved' };
                });

                setComments(updatedComments);
                setFilteredComments(updatedComments);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching comments.');
                setLoading(false);
            });
    }, []);

    // Hàm để thay đổi trạng thái lọc
    const handleFilterChange = (event) => {
        const value = event.target.value;
        setStatusFilter(value);
        filterComments(value, streamIdFilter);
    };

    // Hàm để thay đổi ID buổi live stream
    const handleStreamIdChange = (event) => {
        const value = event.target.value;
        setStreamIdFilter(value);
        filterComments(statusFilter, value);
    };

    // Hàm lọc bình luận theo trạng thái và liveStreamId
    const filterComments = (status, streamId) => {
        const filtered = comments.filter(comment => {
            const matchesStatus = status === 'all' || comment.status === status;
            const matchesStreamId = streamId === 'all' || comment.liveStreamId.toString() === streamId;
            return matchesStatus && matchesStreamId;
        });
        setFilteredComments(filtered);
    };

    // Hàm mở modal xác nhận khi nhấn xóa
    const openDeleteModal = (comment) => {
        setCommentToDelete(comment);
    };

    // Hàm đóng modal xác nhận
    const closeDeleteModal = () => {
        setCommentToDelete(null);
    };

    // Hàm xóa bình luận
    const handleDeleteComment = (id) => {
        if (!id) return;
        axios.delete(`https://671894f07fc4c5ff8f4a0d5d.mockapi.io/api/cmt/${id}`)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== id));
                setFilteredComments(filteredComments.filter(comment => comment.id !== id));
                closeDeleteModal();
                alert('Comment deleted successfully.');
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
                alert('An error occurred while deleting the comment.');
            });
    };

    // Hàm hiển thị modal chi tiết bình luận
    const handleViewComment = (comment) => {
        setSelectedComment(comment);
    };

    // Hàm đóng modal
    const closeModal = () => {
        setSelectedComment(null);
    };

    // Hàm để trả về class dựa trên trạng thái
    const getStatusClass = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Lấy danh sách unique liveStreamId
    const uniqueStreamIds = [...new Set(comments.map(comment => comment.liveStreamId))];

    if (loading) {
        return <p>Loading comments...</p>; // Hiển thị khi đang tải dữ liệu
    }

    if (error) {
        return <p>{error}</p>; // Hiển thị lỗi nếu có
    }

    return (
        <div className="container mx-auto mt-8 p-5 bg-gray-100 shadow-lg rounded-lg">
             <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Comments</h1>
          <div className="flex items-center space-x-4">
            <nav className="text-sm">
              <span className="text-gray-500">Dashboard</span>
              <span className="mx-2">/</span>
              <span>Comments</span>
            </nav>
          </div>
        </div>
            {/* Dropdown để lọc bình luận theo trạng thái và liveStreamId */}
            <div className="mb-4 flex justify-between">
                <div className="w-1/2 mr-2">
                    <label htmlFor="statusFilter" className="mr-2 text-gray-600 font-semibold text-lg">Status</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={handleFilterChange}
                        className="border border-blue-300 text-blue-500 font-semibold text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-700 hover:text-blue-700 w-full"
                    >
                        <option value="all" className="text-gray-700">All</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div className="w-1/2 ml-2">
                    <label htmlFor="streamIdFilter" className="mr-2 text-gray-600 font-semibold text-lg">Live Stream ID</label>
                    <select
                        id="streamIdFilter"
                        value={streamIdFilter}
                        onChange={handleStreamIdChange}
                        className="border border-blue-300 text-blue-500 font-semibold text-lg px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 hover:border-blue-700 hover:text-blue-700 w-full"
                    >
                        <option value="all" className="text-gray-700">All</option>
                        {uniqueStreamIds.map(streamId => (
                            <option key={streamId} value={streamId}>{streamId}</option>
                        ))}
                    </select>
                </div>
            </div>

            <CommentTable
                filteredComments={filteredComments}
                handleViewComment={handleViewComment}
                openDeleteModal={openDeleteModal}
                getStatusClass={getStatusClass}
            />

            {/* Hiển thị Modal nếu có bình luận được chọn */}
            {selectedComment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Comment Details</h3>
                        <p><strong>Username:</strong> {selectedComment.username}</p>
                        <p><strong>Content:</strong> {selectedComment.comment}</p>
                        <p><strong>Status:</strong> {selectedComment.status}</p>
                        <p><strong>Time:</strong> {new Date(selectedComment.timestamp).toLocaleString()}</p>
                        <p><strong>Live Stream ID:</strong> {selectedComment.liveStreamId}</p>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Hiển thị Modal xác nhận xóa */}
            {commentToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete Comment</h3>
                        <p>Are you sure you want to delete the comment from user <strong>{commentToDelete.username}</strong>?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded shadow"
                                onClick={() => handleDeleteComment(commentToDelete.id)}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentManagement;
