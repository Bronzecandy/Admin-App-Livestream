import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// UserForm component with optional 'user' prop for update scenario
const UserForm = ({ user, onSuccess }) => {
    // Initial form values, if 'user' prop exists, fill with existing data for update
    const initialValues = {
        Firstname: user?.Firstname || '',
        Lastname: user?.Lastname || '',
        Birthday: user?.Birthday || '',
        Address: user?.Address || '',
        Email: user?.Email || '',
        Avatar: user?.Avatar || '',
    };

    // Validation schema using Yup
    const validationSchema = Yup.object({
        Firstname: Yup.string().required('First name is required'),
        Lastname: Yup.string().required('Last name is required'),
        Birthday: Yup.date().required('Date of birth is required'),
        Address: Yup.string().required('Address is required'),
        Email: Yup.string().email('Invalid email address').required('Email is required'),
        Avatar: Yup.string().url('Invalid URL').required('Avatar URL is required'),
    });

    // Formik hook for handling form state and validation
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (user) {
                // Update existing user if 'user' prop is passed
                axios.put(`https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609/${user.id}`, values)
                    .then((response) => {
                        alert('User updated successfully');
                        onSuccess(); // Callback to refresh data or close modal
                    })
                    .catch((error) => {
                        console.error('Error updating user:', error);
                    });
            } else {
                // Create new user
                axios.post('https://66938f30c6be000fa07c2d6f.mockapi.io/api/se182609/NamTNTSE182609', values)
                    .then((response) => {
                        alert('User created successfully');
                        onSuccess(); // Callback to refresh data or close modal
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                    });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="Firstname" className="block">First Name</label>
                <input
                    id="Firstname"
                    name="Firstname"
                    type="text"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Firstname && formik.errors.Firstname ? (
                    <div className="text-red-500 text-sm">{formik.errors.Firstname}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="Lastname" className="block">Last Name</label>
                <input
                    id="Lastname"
                    name="Lastname"
                    type="text"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Lastname && formik.errors.Lastname ? (
                    <div className="text-red-500 text-sm">{formik.errors.Lastname}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="Birthday" className="block">Date of Birth</label>
                <input
                    id="Birthday"
                    name="Birthday"
                    type="date"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Birthday && formik.errors.Birthday ? (
                    <div className="text-red-500 text-sm">{formik.errors.Birthday}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="Address" className="block">Address</label>
                <input
                    id="Address"
                    name="Address"
                    type="text"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Address && formik.errors.Address ? (
                    <div className="text-red-500 text-sm">{formik.errors.Address}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="Email" className="block">Email</label>
                <input
                    id="Email"
                    name="Email"
                    type="email"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Email && formik.errors.Email ? (
                    <div className="text-red-500 text-sm">{formik.errors.Email}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="Avatar" className="block">Avatar URL</label>
                <input
                    id="Avatar"
                    name="Avatar"
                    type="text"
                    className="border rounded-lg p-4 w-full"
                    value={formik.values.Avatar}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.Avatar && formik.errors.Avatar ? (
                    <div className="text-red-500 text-sm">{formik.errors.Avatar}</div>
                ) : null}
            </div>

            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full">
                {user ? 'Update User' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;
