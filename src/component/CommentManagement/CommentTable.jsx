import React, { useState } from 'react';

const CommentTable = ({ filteredComments, handleViewComment, openDeleteModal, getStatusClass }) => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); 

    const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const filteredAndPaginatedComments = filteredComments
        .filter(comment => 
            comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
                            <th className="text-left py-4 px-2">Time</th>
                            <th className="text-center py-4 px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {filteredAndPaginatedComments.map(comment => (
                            <tr key={comment.id} className="border-b hover:bg-gray-50 transition-colors duration-300 rounded-lg">
                                <td className="py-4 px-6">{comment.username}</td>
                                <td className="border-b py-4 px-6">{comment.comment}</td>
                                <td className="border-b py-4 px-6">
                                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusClass(comment.status)}`}>
                                        {comment.status}
                                    </span>
                                </td>
                                <td className="border-b px-6 py-4 text-gray-700">{new Date(comment.timestamp).toLocaleString()}</td>
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

            <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-2">
                    <span className="font-semibold">Results per page:</span>
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
                            className={`px-3 py-1 rounded-lg ${p === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'}`}
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
    );
};

export default CommentTable;
