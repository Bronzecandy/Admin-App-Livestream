import { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { fetchCategories } from './MockData';

const VideoCategories = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleNewCategory = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(prev => {
      if (selectedCategory) {
        // Update existing category
        return prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat);
      } else {
        // Add new category
        return [...prev, updatedCategory];
      }
    });
    setIsFormOpen(false);
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
          isOpen={isFormOpen}
          category={selectedCategory}
          onClose={() => setIsFormOpen(false)}
          onUpdate={handleUpdateCategory}
        />
        
        <CategoryList 
          categories={categories}
          onEdit={handleEditCategory}
          onNew={handleNewCategory}
        />
      </div>
    </div>
  );
};

export default VideoCategories;