import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddVideoForm = ({ onAdd, onEdit, video,  setShowForm }) => {
    const isEditing = !!video;

    const initialValues = {
        title: video?.title || '',
        description: video?.description || '',
        duration: video?.duration || '',
        size: video?.size || '',
        quality: video?.quality || '',
        upload_time: video?.upload_time || '',
        url: video?.url || ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        duration: Yup.string().required('Duration is required'),
        size: Yup.string().required('Size is required'),
        quality: Yup.string().required('Quality is required'),
        upload_time: Yup.date().required('Upload time is required'),
        url: Yup.string().url('Invalid URL').required('Video URL is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (isEditing) {
                onEdit({ ...values, id: video.id }); // Include the original ID for updates
            } else {
                onAdd(values); // No need to generate ID; API will do it
            }
            formik.resetForm(); // Reset form after submit
        }
    });

    const formatDateForInput = (dateString) => {
        return dateString ? dateString.slice(0, 16) : '';
    };

    return (
        <form className="mb-6" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700">Duration</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.duration && formik.errors.duration && (
                        <div className="text-red-500 text-sm">{formik.errors.duration}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700">Size</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="size"
                        value={formik.values.size}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.size && formik.errors.size && (
                        <div className="text-red-500 text-sm">{formik.errors.size}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700">Quality</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="quality"
                        value={formik.values.quality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.quality && formik.errors.quality && (
                        <div className="text-red-500 text-sm">{formik.errors.quality}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700">Upload Time</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="datetime-local"
                        name="upload_time"
                        value={formik.values.upload_time ? formatDateForInput(formik.values.upload_time) : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.upload_time && formik.errors.upload_time && (
                        <div className="text-red-500 text-sm">{formik.errors.upload_time}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700">Video URL</label>
                    <input
                        className="border p-2 rounded w-full"
                        type="text"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.url && formik.errors.url && (
                        <div className="text-red-500 text-sm">{formik.errors.url}</div>
                    )}
                </div>
            </div>
            <div className="flex justify-end space-x-4 mt-3">
                <button
                    type="button"
                    onClick={()=>setShowForm(false)}
                    className="w-1/4 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-all duration-200 shadow-md"
                 >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="w-1/4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-md"
         >
                    {isEditing ? 'Update Video' : 'Add Video'}
                </button>
            </div>
           
        </form>
    );
};

export default AddVideoForm;
