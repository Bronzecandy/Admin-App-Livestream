// // CategoryList.jsx
// import React from 'react';
// import PropTypes from 'prop-types';

// const CategoryList = ({ categories }) => {
//   if (!categories || categories.length === 0) {
//     return <div>No categories available</div>;
//   }

//   return (
//     <div>
//       {categories.map((category) => (
//         <div key={category.id}>
//           {category.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// CategoryList.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired
// };

// export default CategoryList;

// CategoryList.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchCategories, deleteCategory } from './MockData';
import CategoryForm from './CategoryForm';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      setCategories((prev) => prev.filter((category) => category._id !== id));
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleNewCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormUpdate = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
    );
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search categories..."
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <button className="border px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Filters</button>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleNewCategory} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            New Category
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-4 px-2">Image</th>
            <th className="py-4 px-2">Name</th>
            <th className="py-4 px-2">Date Created</th>
            <th className="py-4 px-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-2">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </td>
              <td className="py-4 px-2">{category.name}</td>
              {/* <td className="py-4 px-2">{new Date(category.dateCreated).toLocaleDateString()}</td> */}
              <td className="py-4 px-2">
                {category.dateCreated
                  ? new Date(category.dateCreated).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : 'No Date Available'}
              </td>
              <td className="py-4 px-2 text-right">
                <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-800 mr-4">
                  Edit
                </button>
                <button onClick={() => handleDelete(category._id)} className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
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
            className="border px-3 py-1 rounded-lg disabled:opacity-50"
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
            className="border px-3 py-1 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isFormOpen && (
        <CategoryForm
          isOpen={isFormOpen}
          category={selectedCategory}
          onClose={handleFormClose}
          onUpdate={handleFormUpdate}
        />
      )}
    </div>
  );
};

CategoryList.propTypes = {
  onEdit: PropTypes.func,
};

export default CategoryList;
