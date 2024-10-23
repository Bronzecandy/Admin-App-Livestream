import React from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa'; // Import eye and trash icons

const CommentTable = ({ filteredComments, handleViewComment, openDeleteModal, getStatusClass }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-blue-500 text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="border px-6 py-3">Username</th>
                        <th className="border px-6 py-3">Comment Content</th>
                        <th className="border px-6 py-3">Status</th>
                        <th className="border px-6 py-3">Time</th>
                        <th className="border px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {filteredComments.map(comment => (
                        <tr key={comment.id} className="hover:bg-gray-50 transition-colors duration-300 rounded-lg shadow">
                            <td className="border px-6 py-4 text-gray-800 font-medium">{comment.username}</td>
                            <td className="border px-6 py-4 text-gray-700">{comment.comment}</td>
                            <td className={`border px-6 py-4 ${getStatusClass(comment.status)}`}>
                                {comment.status}
                            </td>
                            <td className="border px-6 py-4 text-gray-700">{new Date(comment.timestamp).toLocaleString()}</td>
                            <td className="border px-6 py-4 text-center">
                                <div className="flex justify-center items-center space-x-2">
                                    <button 
                                        onClick={() => handleViewComment(comment)} // Pass comment object
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEye className='text-2xl' /> {/* Thay đổi biểu tượng ở đây */}
                                    </button>
                                    <button 
                                        onClick={() => openDeleteModal(comment)} // Pass comment object
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt className='text-2xl' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommentTable;
