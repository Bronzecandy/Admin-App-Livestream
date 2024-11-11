import React from 'react';

const CategorySelector = ({ categories, selectedCategories, onChange }) => {
    const handleCheckboxChange = (categoryId) => {
        const newSelectedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(_id => _id !== categoryId)
            : [...selectedCategories, categoryId];
        onChange(newSelectedCategories);
    };

    return (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded p-4 z-10 w-full max-h-40 overflow-y-auto border border-gray-300">
            {categories.map((category) => (
                <label key={category._id} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        value={category._id}
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCheckboxChange(category._id)}
                    />
                    <span>{category.name}</span>
                </label>
            ))}
        </div>
    );
};

export default CategorySelector;
