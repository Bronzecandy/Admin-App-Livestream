import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import apiClient from '../apiClient';
const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store selected user for update
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Default page
    const [totalPages, setTotalPages] = useState(1); // Total pages (from API)
    const [searchQuery, setSearchQuery] = useState('');
    const [order, setOrder] = useState('none');
    // Fetch users from API
    const fetchUsers = (page = 1, search = '', order = 'none') => {
        setIsLoading(true);
    
        // Tạo chuỗi query parameters
        let url = `/users?page=${page}&size=10&search=${search}`;
    
        // Thêm tham số order nếu không phải là 'none'
        if (order !== 'none') {
            url += `&order=${order}`;
        }
    
        // Gọi API với URL đã tạo
        apiClient
            .get(url)
            .then((response) => {
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        fetchUsers(currentPage, searchQuery, order);
    }, [currentPage, order]);

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update page number
    };
    
    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            setCurrentPage(1);
            fetchUsers(1, searchQuery, order);
        }
    };
    const handleOrderChange = (event) => {
        const selectedOrder = event.target.value;
        setOrder(selectedOrder);
    };

    // Handler for creating a user (open modal)
    const handleCreateUser = () => {
        setSelectedUser(null); // Clear selected user
        setShowModal(true); // Show modal for creating
    };

    // Handler for updating a user (open modal with existing data)
    const handleUpdateUser = (user) => {
        setSelectedUser(user); // Set selected user for updating
        setShowModal(true); // Show modal for updating
    };

    // Handler for deleting a user
    const handleDeleteUser = (id) => {
        if (window.confirm(`Are you sure you want to delete user with ID ${id}?`)) {
            setIsLoading(true); // Bắt đầu loading
            apiClient.delete(`/users/${id}`)
                .then(() => {
                    alert(`User with ID ${id} deleted successfully`);
                    // Fetch updated list of users
                    return apiClient.get(`/users?page=${currentPage}&size=10`);
                })
                .then((response) => {
                    setUsers(response.data.users); // Cập nhật danh sách người dùng
                })
                .catch((error) => {
                    console.error('Error deleting user or fetching data:', error);
                })
                .finally(() => {
                    setIsLoading(false); // Kết thúc loading
                });
        }
    };

    // Handler to close modal and refresh list
    const handleFormSuccess = () => {
        setShowModal(false); // Close modal
        // Fetch users again to update list
        apiClient.get('/NamTNTSE182609')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className='p-8 bg-gray-50'>
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold'> User</h1>
            </div>
            <div className="container mx-auto flex flex-col gap-4 bg-white p-8 rounded-2xl shadow ">
                <div className='flex justify-between flex-wrap gap-4'>
                    <div className="flex items-center flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật từ khóa tìm kiếm
                            onKeyDown={handleSearchKeyPress} // Xử lý nhấn Enter
                            className="px-4 py-2 border rounded-lg max-w-md"
                        />
                        <div className='flex items-center gap-2'>
                            <h1>Order By:</h1>
                            <select
                                value={order}
                                onChange={handleOrderChange}
                                className="px-4 py-2 border rounded-lg"
                            >
                                <option value="none">None</option>
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
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
                        <button
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center gap-4"
                            onClick={handleCreateUser}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Create User
                        </button>
                    </div>
                </div>
                {/* Make the table responsive */}
                {isLoading ? (
                    // Loading Spinner
                    <div className="flex justify-center items-center py-6">
                        <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className='text-center'>
                                    <th className="px-2 py-4 text-left">Name</th>
                                    <th className="px-2 py-4">Nick Name</th>
                                    <th className="px-2 py-4">Followers</th>
                                    <th className="px-2 py-4">Email</th>
                                    <th className="px-2 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id} className="border-t border-b">
                                            <td className="px-2 py-4 flex items-center whitespace-nowrap">
                                                <img
                                                    src={user.avatar} // Assuming 'avatar' is the key for user avatar URL
                                                    alt="avatar"
                                                    className="w-10 h-10 rounded-full mr-2 "
                                                />
                                                {user.fullName}
                                            </td>
                                            <td className="px-2 py-4 text-center whitespace-nowrap">{user.nickName}</td>
                                            <td className="px-2 py-4 text-center whitespace-nowrap">{user.followCount}</td>
                                            <td className="px-2 py-4 text-center whitespace-nowrap">{user.email}</td>
                                            <td className="px-2 py-4 text-center whitespace-nowrap">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-2" colSpan="5">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>)}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
                {/* Show UserForm in Modal */}
                <UserForm user={selectedUser} onSuccess={handleFormSuccess} isOpen={showModal} onClose={() => setShowModal(false)} />
            </div>
        </div>
    );
};

export default UserTable;
