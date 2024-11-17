import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CategoryForm from './CategoryForm';
import CategoryService from './CategoryService';

const CategoryList = ({ categories: initialCategories }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(initialCategories || []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Có lỗi xảy ra khi tải danh sách thể loại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleViewDetails = async (category) => {
    try {
      const details = await CategoryService.getCategoryById(category._id);
      setSelectedCategoryDetails(details);
      setIsDetailsModalOpen(true);
    } catch (error) {
      console.error('Error fetching category details:', error);
      alert('Có lỗi xảy ra khi tải chi tiết thể loại.');
    }
  };

  const handleDeleteClick = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await CategoryService.deleteCategory(categoryId);
        setCategories(prevCategories =>
          prevCategories.filter(category => category._id !== categoryId)
        );
        alert('Category deleted successfully');
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
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
        <button key="1" onClick={() => setCurrentPage(1)} className="px-3 py-1 rounded-md hover:bg-gray-100">1</button>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      buttons.push(
        <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 rounded-md hover:bg-gray-100">{totalPages}</button>
      );
    }

    return buttons;
  };

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading...</div>;
  }

  if (!categories.length) {
    return <div className="bg-white rounded-lg shadow p-6">No categories available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
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
        <button onClick={handleCreateClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center">
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg> */}
          Create New Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-2 w-24">Image</th>
              <th className="text-left py-4 px-2 w-1/3">Name</th>
              <th className="text-left py-4 px-2 w-1/4">Date Created</th>
              <th className="text-right py-4 px-4 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-2">
                  <img 
                    src={`http://localhost:5173/${category.imageUrl?.split('/').slice(3).join("/")}`} 
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-2 truncate">{category.name}</td>
                <td className="py-4 px-2">{new Date(category.dateCreated).toLocaleDateString()}</td>
                <td className="py-4 px-2">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => handleViewDetails(category)} className="p-2 text-gray-600 hover:bg-gray-50 rounded flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button onClick={() => handleEditClick(category)} className="p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-2-2l4-4m0 0L18 7m-4 4v6" />
                      </svg>
                    </button>
                    <button onClick={() => handleDeleteClick(category._id)} className="p-2 text-gray-600 hover:bg-gray-50 rounded flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of {filteredCategories.length} results
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {renderPaginationButtons()}
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {isFormOpen && (
        <CategoryForm
          isOpen={isFormOpen}
          category={selectedCategory}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
          onRefresh={fetchCategories}
        />
      )}

      {isDetailsModalOpen && selectedCategoryDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Content */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Category Details</h2>
              <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {/* Image Section */}
              {selectedCategoryDetails.category.imageUrl ? (
                <img src={`http://localhost:5173/${selectedCategoryDetails.category.imageUrl?.split('/').slice(3).join("/")}`} alt={selectedCategoryDetails.category.name} className="w-full h-64 object-cover rounded-xl" />
              ) : (
                <div className="bg-gray-100 h-64 flex items-center justify-center">
                  <p>No Image Available</p>
                </div>
              )}
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-500">Category Name</label>
                  <p className="text-lg font-medium text-gray-900">{selectedCategoryDetails.category.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">ID</label>
                  <p className="text-sm font-mono text-gray-700">{selectedCategoryDetails.category._id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Created</label>
                  <p className="text-sm text-gray-700">{new Date(selectedCategoryDetails.category.dateCreated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setIsDetailsModalOpen(false)} className="px-4 py-2 bg-white text-gray-700 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    )
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      imageUrl: PropTypes.string,
      dateCreated: PropTypes.string,
    })
  ),
};

export default CategoryList;