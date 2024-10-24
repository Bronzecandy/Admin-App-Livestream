import { useState } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

const VideoCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = (updatedCategory) => {
    // Có thể thêm logic cập nhật danh sách categories ở đây nếu cần
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <div className="flex items-center space-x-4">
            <nav className="text-sm">
              <span className="text-gray-500">Product</span>
              <span className="mx-2">/</span>
              <span>Categories</span>
            </nav>
          </div>
        </div>
        
        <CategoryForm
          isOpen={isModalOpen}
          category={selectedCategory}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateCategory}
        />
        
        <CategoryList onEdit={handleEditCategory} />
      </div>
    </div>
  );
};

export default VideoCategories;