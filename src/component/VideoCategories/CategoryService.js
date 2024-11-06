// src/services/CategoryService.js

const API_URL = import.meta.env.VITE_API_URL;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFhMTRmNDZkMDUwODg0MjNlZWFiOTEiLCJpcCI6Ijo6MSIsImlhdCI6MTczMDQ2MDgxN30._dqyZS4blv-60Ii18LOfGNzkutur_fXJy80H1NKJyRE';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Server error');
  }
  return data;
};

const getHeaders = () => ({
  "Authorization": `Bearer ${token}`,
  "Content-Type": "application/json",
});

const CategoryService = {
  login: async () => {
    token = import.meta.env.VITE_API_TOKEN; // Assuming token is static for now
    return token;
  },

  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        headers: getHeaders(),
        method: "GET",
      });
      const data = await handleResponse(response);
      return data.categories || data; // Extracts array if nested
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Không thể lấy danh sách thể loại");
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(categoryData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Không thể tạo thể loại mới");
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(categoryData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Error updating category:", error);
      throw new Error("Không thể cập nhật thể loại");
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error("Không thể xóa thể loại");
    }
  },
};

export default CategoryService;
