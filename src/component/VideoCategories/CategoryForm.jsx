import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryService from './CategoryService';

const CategoryForm = ({ isOpen, category, onClose, onSuccess, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryUrl: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        categoryUrl: null,
      });
    } else {
      setFormData({
        name: '',
        categoryUrl: null,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'categoryUrl') {
      setFormData((prev) => ({
        ...prev,
        categoryUrl: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên thể loại');
      return false;
    }
    if (!formData.categoryUrl) {
      setError('Vui lòng chọn một hình ảnh');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submissionData = {
        name: formData.name,
        categoryUrl: formData.categoryUrl, // Thêm file vào dữ liệu gửi
      };

      let result;
      if (category) {
        result = await CategoryService.updateCategory(category._id, submissionData);
      } else {
        result = await CategoryService.createCategory(submissionData);
      }

      onSuccess(result);
      onRefresh();
      onClose();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {category ? 'Cập nhật thể loại' : 'Thêm thể loại mới'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors duration-200">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm animate-pulse">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4a1 1 0 102 0V9a1 1 0 10-2 0zm0-4a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Tên thể loại *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400"
              placeholder="Nhập tên thể loại"
            />
          </div>

          {formData.categoryUrl && (
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Xem trước</label>
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={typeof formData.categoryUrl === 'string' ? formData.categoryUrl : URL.createObjectURL(formData.categoryUrl)}
                  alt="Preview"
                  className="w-full h-56 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          )}

          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-200">Chọn hình ảnh *</label>
            <input
              type="file"
              name="categoryUrl"
              onChange={handleChange}
              accept="image/*"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:shadow-md transition-all duration-200 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 min-w-[120px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : (
                category ? 'Cập nhật' : 'Thêm mới'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

CategoryForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default CategoryForm;