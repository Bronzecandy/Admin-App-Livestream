// // CategoryList.jsx
// import React from 'react';
// import PropTypes from 'prop-types';

// const CategoryList = ({ categories }) => {
//   if (!categories || categories.length === 0) {
//     return <div className="bg-white rounded-lg shadow p-6">No categories available</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             placeholder="Search"
//             className="px-4 py-2 border rounded-lg"
//           />
//           <button className="px-4 py-2 border rounded-lg">Filters</button>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button className="p-2 rounded-lg hover:bg-gray-100">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//             </svg>
//           </button>
//           <button className="p-2 rounded-lg hover:bg-gray-100">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//             </svg>
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//             </svg>
//             <span>New Category</span>
//           </button>
//         </div>
//       </div>

//       <table className="w-full">
//         <thead>
//           <tr className="border-b">
//             <th className="text-left py-4 px-2">Image</th>
//             <th className="text-left py-4 px-2">Name</th>
//             <th className="text-left py-4 px-2">Date Created</th>
//             <th className="text-right py-4 px-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category._id} className="border-b hover:bg-gray-50">
//               <td className="py-4 px-2">
//                 <img 
//                   src={category.imageUrl} 
//                   alt={category.name}
//                   className="w-12 h-12 object-cover rounded"
//                 />
//               </td>
//               <td className="py-4 px-2">
//                 <div className="flex items-center space-x-2">
//                   <span>{category.name}</span>
//                 </div>
//               </td>
//               <td className="py-4 px-2">
//                 {new Date(category.dateCreated).toLocaleDateString()}
//               </td>
//               <td className="py-4 px-2">
//                 <div className="flex justify-end space-x-2">
//                   <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
//                     Edit
//                   </button>
//                   <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// CategoryList.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       dateCreated: PropTypes.string.isRequired,
//       imageUrl: PropTypes.string.isRequired,
//     })
//   ).isRequired
// };

// export default CategoryList;
// CategoryList.jsx
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import CategoryForm from './CategoryForm';

const CategoryList = ({ categories: initialCategories }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(initialCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  if (!categories || categories.length === 0) {
    return <div className="bg-white rounded-lg shadow p-6">No categories available</div>;
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (formData) => {
    if (selectedCategory) {
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat._id === selectedCategory._id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      const newCategory = {
        _id: Date.now().toString(),
        ...formData,
        dateCreated: new Date().toISOString()
      };
      setCategories(prevCategories => [...prevCategories, newCategory]);
    }
    setIsFormOpen(false);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 rounded-md hover:bg-gray-100"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 rounded-md hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded-lg"
          />
          <button className="px-4 py-2 border rounded-lg">Filters</button>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleCreateClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Category</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-2 w-24">Image</th>
              <th className="text-left py-4 px-2 w-1/3">Name</th>
              <th className="text-left py-4 px-2 w-1/4">Date Created</th>
              <th className="text-right py-4 px-2 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2">
                  <div className="w-12 h-12">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                </td>
                <td className="py-4 px-2 truncate">{category.name}</td>
                <td className="py-4 px-2">
                  {new Date(category.dateCreated).toLocaleDateString()}
                </td>
                <td className="py-4 px-2">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEditClick(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      Edit
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
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
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          {renderPaginationButtons()}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <CategoryForm
        isOpen={isFormOpen}
        category={selectedCategory}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      dateCreated: PropTypes.string,
    })
  ),
};

export default CategoryList;