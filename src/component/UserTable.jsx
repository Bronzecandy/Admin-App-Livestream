import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Store selected user for update
    const [showModal, setShowModal] = useState(false); // Manage modal visibility

    // Fetch users from API
    useEffect(() => {
        axios.get('https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
            axios.delete(`https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609/${id}`)
                .then(() => {
                    alert(`User with ID ${id} deleted successfully`);
                    setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from list
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                });
        }
    };

    // Handler to close modal and refresh list
    const handleFormSuccess = () => {
        setShowModal(false); // Close modal
        // Fetch users again to update list
        axios.get('https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609')
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
                        <input type="text" placeholder="Search" className="px-4 py-2 border rounded-lg" />
                        <button className="px-4 py-2 border rounded-lg">Filters</button>
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
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className='text-center'>
                                <th className="px-2 py-4 text-left">Name</th>
                                <th className="px-2 py-4">Date of Birth</th>
                                <th className="px-2 py-4">Address</th>
                                <th className="px-2 py-4">Email</th>
                                <th className="px-2 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id} className="border-t border-b">
                                        <td className="px-2 py-4 flex items-center whitespace-nowrap">
                                            <img
                                                src={user.Avatar} // Assuming 'avatar' is the key for user avatar URL
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full mr-2 "
                                            />
                                            {user.Firstname} {user.Lastname}
                                        </td>
                                        <td className="px-2 py-4 text-center whitespace-nowrap">{user.Birthday}</td>
                                        <td className="px-2 py-4 text-center whitespace-nowrap">{user.Address}</td>
                                        <td className="px-2 py-4 text-center whitespace-nowrap">{user.Email}</td>
                                        <td className="px-2 py-4 text-center whitespace-nowrap">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleUpdateUser(user)} // Open form for editing
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
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
                </div>
                {/* Show UserForm in Modal */}
                <UserForm user={selectedUser} onSuccess={handleFormSuccess} isOpen={showModal} onClose={() => setShowModal(false)} />
            </div>
        </div>
    );
};

export default UserTable;
