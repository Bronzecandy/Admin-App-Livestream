let categories = [
    {
      id: 1,
      name: 'Education',
      featured: true,
      products: 25,
      status: 'active',
      childCount: 14,
      children: [
        {
          id: 2,
          name: 'Programming',
          featured: true,
          products: 12,
          status: 'active',
          childCount: 7,
          children: [
            {
              id: 4,
              name: 'JavaScript',
              featured: true,
              products: 5,
              status: 'active'
            },
            {
              id: 5,
              name: 'Python',
              featured: true,
              products: 7,
              status: 'active'
            }
          ]
        },
        {
          id: 3,
          name: 'Business',
          featured: false,
          products: 8,
          status: 'active',
          childCount: 2
        },
        {
          id: 6,
          name: 'Design',
          featured: true,
          products: 5,
          status: 'active',
          childCount: 5
        }
      ]
    },
    {
      id: 7,
      name: 'Entertainment',
      featured: true,
      products: 30,
      status: 'active',
      childCount: 12,
      children: [
        {
          id: 8,
          name: 'Gaming',
          featured: true,
          products: 15,
          status: 'active'
        },
        {
          id: 9,
          name: 'Music',
          featured: true,
          products: 15,
          status: 'active'
        }
      ]
    },
    {
      id: 10,
      name: 'Sports',
      featured: false,
      products: 20,
      status: 'active',
      childCount: 15,
      children: [
        {
          id: 11,
          name: 'Football',
          featured: true,
          products: 8,
          status: 'active'
        },
        {
          id: 12,
          name: 'Basketball',
          featured: false,
          products: 6,
          status: 'active'
        },
        {
          id: 13,
          name: 'Tennis',
          featured: false,
          products: 6,
          status: 'active'
        }
      ]
    },
    {
      id: 14,
      name: 'Technology',
      featured: true,
      products: 18,
      status: 'active',
      childCount: 10,
      children: [
        {
          id: 15,
          name: 'Smartphones',
          featured: true,
          products: 6,
          status: 'active'
        },
        {
          id: 16,
          name: 'Computers',
          featured: true,
          products: 7,
          status: 'active'
        },
        {
          id: 17,
          name: 'Gadgets',
          featured: false,
          products: 5,
          status: 'active'
        }
      ]
    },
    {
      id: 18,
      name: 'Cooking',
      featured: false,
      products: 15,
      status: 'active',
      childCount: 8
    },
    {
      id: 19,
      name: 'Travel',
      featured: true,
      products: 12,
      status: 'active'
    }
  ];
  
  // Giữ nguyên các hàm xử lý, chỉ thay đổi dữ liệu
  export const fetchCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const flattenCategories = (cats, level = 0) => {
                return cats.reduce((acc, cat) => {
                    const flatCat = { ...cat, level };
                    acc.push(flatCat);
                    if (cat.children?.length > 0) {
                        acc.push(...flattenCategories(cat.children, level + 1));
                    }
                    return acc;
                }, []);
            };
            const flatCategories = flattenCategories(categories);
            resolve(flatCategories);
        }, 1000);
    });
};

// Add a new category
export const addCategory = (newCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const category = {
                id: Math.max(...categories.map(c => c.id)) + 1,
                featured: false,
                products: 0,
                status: 'active',
                ...newCategory
            };
            categories.push(category);
            resolve(category);
        }, 500);
    });
};

// Update an existing category
export const updateCategory = (updatedCategory) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.map((cat) =>
                cat.id === updatedCategory.id ? { ...cat, ...updatedCategory } : cat
            );
            resolve(updatedCategory);
        }, 500);
    });
};

// Delete a category by ID
export const deleteCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.filter((cat) => cat.id !== categoryId);
            resolve();
        }, 500);
    });
};

// Toggle a category's featured status
export const toggleCategoryFeature = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    return { ...cat, featured: !cat.featured };
                }
                return cat;
            });
            resolve();
        }, 500);
    });
};

// Toggle a category's active/inactive status
export const toggleCategoryStatus = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            categories = categories.map((cat) => {
                if (cat.id === categoryId) {
                    const newStatus = cat.status === 'active' ? 'inactive' : 'active';
                    return { ...cat, status: newStatus };
                }
                return cat;
            });
            resolve();
        }, 500);
    });
};