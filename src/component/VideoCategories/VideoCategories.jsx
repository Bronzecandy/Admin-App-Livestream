// src/components/VideoCategories/VideoCategories.jsx
import React, { useState, useEffect } from 'react';
import CategoryList from './CategoryList';
import CategoryService from './CategoryService';

const VideoCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateAndFetchCategories = async () => {
      try {
        await CategoryService.login(); // Login and set the token
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError('Không thể lấy danh sách thể loại');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    authenticateAndFetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <CategoryList categories={categories} />
      )}
    </div>
  );
};

export default VideoCategories;
