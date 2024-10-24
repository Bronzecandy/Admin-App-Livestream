import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchCategories, deleteCategory } from './MockData';
import CategoryForm from './CategoryForm'; // Import the form component

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFormOpen, setIsFormOpen] = useState(false); // Track form open/close
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category); // Set the category to be edited
    setIsFormOpen(true); // Open the form
  };

  const handleNewCategory = () => {
    setSelectedCategory(null); // No category for new category creation
    setIsFormOpen(true); // Open the form
  };

  const handleFormClose = () => {
    setIsFormOpen(false); // Close the form
  };

  const handleFormUpdate = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
    );
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 border rounded-lg">Filters</button>
        </div>
        <div className="flex items-center space-x-2">
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
            onClick={handleNewCategory} // Open form for new category
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Category</span>
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-2">Name</th>
            <th className="text-left py-4 px-2">Featured</th>
            <th className="text-left py-4 px-2">Products</th>
            <th className="text-left py-4 px-2">Status</th>
            <th className="text-right py-4 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-2">
                <div className="flex items-center space-x-2">
                  <span>{category.name}</span>
                  {category.childCount && <span className="text-gray-500">({category.childCount})</span>}
                </div>
              </td>
              <td className="py-4 px-2">
                {category.featured ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </td>
              <td className="py-4 px-2">{category.videoCount || '-'}</td>
              <td className="py-4 px-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {category.status}
                </span>
              </td>
              <td className="py-4 px-2">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(category)} // Open form for editing
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-2">
          <span>Results per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded-lg px-2 py-1"
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-lg ${
                p === page ? 'bg-blue-600 text-white' : 'border hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isFormOpen && (
        <CategoryForm
          isOpen={isFormOpen}
          category={selectedCategory} // Pass selected category or null for new
          onClose={handleFormClose} // Close form handler
          onUpdate={handleFormUpdate} // Handle category update
        />
      )}
    </div>
  );
};

CategoryList.propTypes = {
  onEdit: PropTypes.func,
};

export default CategoryList;
