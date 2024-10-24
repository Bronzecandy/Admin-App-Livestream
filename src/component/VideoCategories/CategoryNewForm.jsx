// src/component/VideoCategories/CategoryNewForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { addCategory } from './MockData';

const CategoryNewForm = ({ onCategoryCreated, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = await addCategory({ name });
    onCategoryCreated(newCategory);
    setName(''); // Reset form sau khi thêm thành công
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Thêm thể loại mới</h2>
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600 mb-1">
          Tên thể loại
        </label>
        <input
          type="text"
          id="categoryName"
          placeholder="Nhập tên thể loại"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/3 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-all duration-200 shadow-md"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="w-1/3 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-md"
        >
          Thêm
        </button>
      </div>
    </form>
  );
};

CategoryNewForm.propTypes = {
  onCategoryCreated: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CategoryNewForm;
