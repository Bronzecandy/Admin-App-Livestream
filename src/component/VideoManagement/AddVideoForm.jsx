import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import CategorySelector from './CategorySelector';

const AddVideoForm = ({ onEdit, video, setShowForm }) => {
    const [categories, setCategories] = useState([]); // Lưu danh sách categories
    const [thumbnailPreview, setThumbnailPreview] = useState(video.thumbnailUrl);
    const [isCategorySelectorOpen, setCategorySelectorOpen] = useState(false);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');  // Lấy token từ localStorage (hoặc từ props/context nếu có)

            try {
                const response = await axios.get('https://social-media-z5a2.onrender.com/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,  // Gửi token trong header của yêu cầu
                    },
                });
                console.log(response.data);
                
                setCategories(response.data.categories); // Giả sử response.data chứa danh sách categories
            } catch (error) {
                setError('Error fetching categories');
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []); // Chỉ gọi API khi component được mount

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("thumbnailUrl", file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const handleCategoryChange = (selectedCategories) => {
        formik.setFieldValue('categoryIds', selectedCategories);
    };

    const initialValues = {
        title: video?.title || '',
        description: video?.description || '',
        categoryIds: video?.categoryIds || [],
        enumMode: video?.enumMode || 'public',
        thumbnailUrl: video?.thumbnailUrl || ''
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            onEdit({ ...values, id: video._id });
            formik.resetForm();
            setShowForm(false);
        }
    });

    return (
        <form className="p-6 bg-white" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
                {/* Title and Description */}
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
                </div>

                {/* Category Selector */}
                <div className="relative">
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        onClick={() => setCategorySelectorOpen(!isCategorySelectorOpen)}
                    >
                        Chọn Category
                    </button>

                    {isCategorySelectorOpen && (
                        <CategorySelector
                            categories={categories} // Dùng categories từ API
                            selectedCategories={formik.values.categoryIds}
                            onChange={handleCategoryChange}
                        />
                    )}
                </div>

                {/* Enum Mode */}
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
                </div>

                {/* Thumbnail URL */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Thumbnail</label>
                    <input
                        type="file"
                        name="thumbnailUrl"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                    />
                    {thumbnailPreview && (
                        <img className="mt-4 w-32 h-32 object-cover rounded" src={thumbnailPreview} alt="" />
                    )}
                </div>
            </div>

            {/* Action Buttons */}
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
