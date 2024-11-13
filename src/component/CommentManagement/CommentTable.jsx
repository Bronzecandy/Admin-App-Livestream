import React, { useState } from 'react';
import axios from 'axios';

const CommentTable = ({ filteredComments, handleViewComment, getStatusClass, refreshComments }) => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE';

    const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const filteredAndPaginatedComments = filteredComments
        .filter(comment =>
            comment.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleDeleteComment = async () => {
        if (commentToDelete) {
            try {
                const response = await axios.delete(`https://social-media-z5a2.onrender.com/api/comments/${commentToDelete._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data.message === "Delete successfully") {
                    alert(response.data.message);
                    refreshComments(); // Gọi refreshComments để tải lại dữ liệu
                } else {
                    alert("Có lỗi xảy ra khi xóa bình luận.");
                }

                setShowDeleteModal(false);
                setCommentToDelete(null);
            } catch (error) {
                console.error("Error deleting comment:", error);
                alert("Không thể xóa bình luận. Vui lòng thử lại sau.");
            }
        }
    };

    const openDeleteModal = (comment) => {
        setShowDeleteModal(true);
        setCommentToDelete(comment);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setCommentToDelete(null);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search comments"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-4 px-2">Username</th>
                            <th className="text-left py-4 px-2">Comment Content</th>
                            <th className="text-left py-4 px-2">Status</th>
                            <th className="text-left py-4 px-2">Video Title</th>
                            <th className="text-center py-4 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredAndPaginatedComments.map(comment => (
                            <tr key={comment._id} className="border-b hover:bg-gray-50 transition-colors duration-300 rounded-lg">
                                <td className="py-4 px-6">{comment.user.fullName}</td>
                                <td className="border-b py-4 px-6">{comment.content}</td>
                                <td className="border-b py-4 px-6">
                                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusClass(comment.status)}`}>
                                        {comment.status}
                                    </span>
                                </td>
                                <td className="border-b px-6 py-4 text-gray-700">{comment.videoTitle}</td>
                                <td className="border-b px-6 py-4 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        <button
                                            onClick={() => handleViewComment(comment)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => openDeleteModal(comment)}
                                            className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h3 className="text-xl font-semibold mb-4">Xác nhận xóa</h3>
                        <p>Bạn có chắc chắn muốn xóa bình luận này không?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDeleteComment}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentTable;
