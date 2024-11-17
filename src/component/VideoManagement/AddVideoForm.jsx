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
            const token = localStorage.getItem('token');  
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
    }, []); 

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
            console.log(values);
            
            onEdit({ ...values, id: video._id });
            formik.resetForm();
            setShowForm(false);
        }
    });

    return (
        <form className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto" onSubmit={formik.handleSubmit}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Video</h2>

            <div className="grid grid-cols-1 gap-6">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition duration-200"
                        name="description"
                        rows="4"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>

                {/* Category Selector */}
                <div className="relative">
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <button
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:opacity-90 transition duration-200"
                        onClick={() => setCategorySelectorOpen(!isCategorySelectorOpen)}
                    >
                        Select Category
                    </button>

                    {isCategorySelectorOpen && (
                        <CategorySelector
                            categories={categories}
                            selectedCategories={formik.values.categoryIds}
                            onChange={handleCategoryChange}
                        />
                    )}
                </div>

                {/* Enum Mode */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Enum Mode</label>
                    <select
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
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
                    <label className="block text-gray-700 font-semibold mb-2">Thumbnail</label>
                    <div className="flex flex-col items-center space-y-4">

                        {/* Custom button to trigger file input */}
                        <button
                            type="button"
                            onClick={() => document.getElementById('thumbnailInput').click()}
                            className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            Chọn ảnh
                        </button>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            name="thumbnailUrl"
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur}
                            className="hidden"
                            id="thumbnailInput"
                        />

                        {/* Display thumbnail preview if file is selected */}
                        {thumbnailPreview && (
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                                <img
                                    className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-200 transform hover:scale-105"
                                    src={thumbnailPreview}
                                    alt="Thumbnail Preview"
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-1/4 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition duration-200 shadow-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 shadow-md"
                >
                    Update Video
                </button>
            </div>
        </form>

    );
};

export default AddVideoForm;
