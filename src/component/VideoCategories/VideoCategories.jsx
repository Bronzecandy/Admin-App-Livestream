import React, { useEffect, useState } from 'react';
import CategoryList from './CategoryList';
import CategoryService from './CategoryService';

const VideoCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await CategoryService.getAllCategories();
        setCategories(result.data || result); // Adjust if response wraps data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return <CategoryList categories={categories} />;
};

export default VideoCategories;
