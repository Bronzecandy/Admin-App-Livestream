import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import FontAwesome icons
import UserForm from './UserForm';
import Modal from './Modal';
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
        axios.delete(`https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609/${id}`)
        .then(() => {
            alert(`User with ID ${id} deleted successfully`);
            setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from list
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
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
        <div className="container mx-auto flex flex-col gap-4">
            <div className='flex justify-end'>
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCreateUser}
                >
                    Create User
                </button>
            </div>

            {/* Make the table responsive */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className='bg-[#f7f9fc] text-[#64748B] text-center'>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Date of Birth</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="border-t border-b">
                                    <td className="px-4 py-2 flex items-center whitespace-nowrap">
                                        <img
                                            src={user.Avatar} // Assuming 'avatar' is the key for user avatar URL
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        {user.Firstname} {user.Lastname}
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">{user.Birthday}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">{user.Address}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">{user.Email}</td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                onClick={() => handleUpdateUser(user)} // Pass user object
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <FaEdit className='text-2xl'/>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrashAlt className='text-2xl' />
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
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <UserForm user={selectedUser} onSuccess={handleFormSuccess} />
            </Modal>
        </div>
    );
};

export default UserTable;
