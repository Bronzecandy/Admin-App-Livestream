// src/components/VideoCategories/CategoryForm.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryService from './CategoryService';

const CategoryForm = ({ isOpen, category, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    status: true,
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        imageUrl: category.imageUrl || '',
        status: category.status ?? true,
        featured: category.featured ?? false,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        status: true,
        featured: false,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await CategoryService.login(); // Ensure token is set before submitting

      let result;
      if (category) {
        result = await CategoryService.updateCategory(category._id, formData);
      } else {
        result = await CategoryService.createCategory(formData);
      }

      onSuccess(result);
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {category ? 'Cập nhật thể loại' : 'Thêm thể loại mới'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
              Tên thể loại *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Nhập tên thể loại"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              rows="3"
              placeholder="Nhập mô tả thể loại"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600 mb-1">
              URL hình ảnh
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Nhập URL hình ảnh"
            />
          </div>

          <div className="mb-4 space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label htmlFor="status" className="ml-2 block text-sm text-gray-600">
                Kích hoạt
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-600">
                Nổi bật
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 shadow-md"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 shadow-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : category ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CategoryForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    status: PropTypes.bool,
    featured: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default CategoryForm;
