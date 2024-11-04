import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddVideoForm = ({ onEdit, video, setShowForm }) => {
    console.log(video.thumbnailUrl);
    
    const [thumbnailPreview, setThumbnailPreview] = useState(video.thumbnailUrl);
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("thumbnailUrl", file);  // Lưu tệp vào Formik
            setThumbnailPreview(URL.createObjectURL(file));  // Tạo URL xem trước
        }
    };
    const initialValues = {
        title: video?.title || '',
        description: video?.description || '',
        categoryIds: video?.categoryIds || [],
        enumMode: video?.enumMode || 'public',
        thumbnailUrl: video?.thumbnailUrl || ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        duration: Yup.string().required('Duration is required'),
        size: Yup.string().required('Size is required'),
        quality: Yup.string().required('Quality is required'),
        upload_time: Yup.date().required('Upload time is required'),
        url: Yup.string().url('Invalid URL').required('Video URL is required'),
        categoryIds: Yup.array().of(Yup.string()).required('Category is required'),
        enumMode: Yup.string().required('Mode is required'),
        thumbnailUrl: Yup.string().url('Invalid URL').required('Thumbnail URL is required'),
    });

    const formik = useFormik({

        initialValues,
        // validationSchema,
        onSubmit: (values) => {
            onEdit({ ...values, id: video._id });
            formik.resetForm();
            setShowForm(false);
        }
    });

    return (
        <form className="p-6 bg-white " onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Title</label>
                    <input
                        className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Description</label>
                    <textarea
                        className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category IDs (Comma Separated)</label>
                    <input
                        className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="text"
                        name="categoryIds"
                        value={formik.values.categoryIds.join(', ')}
                        onChange={(e) =>
                            formik.setFieldValue('categoryIds', e.target.value.split(',').map(id => id.trim()))
                        }
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.categoryIds && formik.errors.categoryIds && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.categoryIds}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Enum Mode</label>
                    <select
                        className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
                        name="enumMode"
                        value={formik.values.enumMode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    {formik.touched.enumMode && formik.errors.enumMode && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.enumMode}</div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Thumbnail URL</label>
                    <input
                        className="border p-2 rounded w-full focus:outline-none focus:border-blue-500"
                        type="file"
                        name="thumbnailUrl"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                    />

                    {thumbnailPreview && (
                        <img className="mt-4 w-32 h-32 object-cover rounded" crossOrigin="anonymous" src={thumbnailPreview} alt="" />
                    )}
                    {formik.touched.thumbnailUrl && formik.errors.thumbnailUrl && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.thumbnailUrl}</div>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-1/4 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-all duration-200 shadow-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-md"
                >
                   Update Video
                </button>
            </div>
        </form>
    );
};

export default AddVideoForm;
