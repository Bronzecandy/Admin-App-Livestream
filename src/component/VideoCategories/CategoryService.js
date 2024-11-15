const API_URL = import.meta.env.VITE_API_URL;
let token = '';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Server error');
  }
  // Xử lý URL ảnh trong response
  if (data.category && data.category.imageUrl) {
    data.category.imageUrl = `http://localhost:5173/${data.category.imageUrl.split('/').slice(3).join("/")}`;
  }
  if (data.categories) {
    data.categories = data.categories.map(category => ({
      ...category,
      imageUrl: category.imageUrl ? `http://localhost:5173/${category.imageUrl.split('/').slice(3).join("/")}` : null
    }));
  }
  return data;
};

const getHeaders = (isFormData = false) => {
  const headers = {
    "Authorization": `Bearer ${token}`
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

const CategoryService = {
  login: async () => {
    token = import.meta.env.VITE_API_TOKEN;
    return token;
  },

  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        headers: getHeaders(),
        method: "GET",
      });
      const data = await handleResponse(response);
      return data.categories || data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Không thể lấy danh sách thể loại");
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${categoryId}`, {
        headers: getHeaders(),
        method: "GET",
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Error fetching category:", error);
      throw new Error("Không thể lấy thông tin thể loại");
    }
  },

  createCategory: async (categoryData) => {
    const formData = new FormData();
    // if (categoryData.imageFile) {
    //   formData.append('categoryUrl', categoryData.imageFile); // Thêm file vào FormData
    // }
    Object.keys(categoryData).forEach(key => {
      formData.append(key, categoryData[key]); // Thêm các trường khác
    });
  
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: getHeaders(true), // Đặt isFormData là true
        body: formData,
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Không thể tạo thể loại mới");
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    const formData = new FormData();
    // if (categoryData.imageFile) {
    //   formData.append('file', categoryData.imageFile); // Thêm file vào FormData
    // }
    categoryData["categoryImg"] = categoryData["categoryUrl"]
    delete categoryData["categoryUrl"]
    Object.keys(categoryData).forEach(key => {
      formData.append(key, categoryData[key]); // Thêm các trường khác
    });
  
    try {
      const response = await fetch(`http://localhost:5173/api/categories/${categoryId}`, {
        method: "PUT",
        headers: getHeaders(true), // Đặt isFormData là true
        body: formData,
        credentials: 'include'
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

  // Hàm tiện ích để xử lý URL ảnh
  getImageUrl: (imageUrl) => {
    if (!imageUrl) return null;
    return `http://localhost:5173/${imageUrl.split('/').slice(3).join("/")}`;
  }
};

export default CategoryService;
