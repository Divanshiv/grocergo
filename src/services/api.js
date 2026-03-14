import { products, categories, banners } from '../data/groceries';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  getProducts: async (filters = {}) => {
    await delay(600);
    let result = [...products];
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower));
    }
    if (filters.featured) result = result.filter(p => p.featured);
    if (filters.sort) {
      if (filters.sort === 'price-low') result.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-high') result.sort((a, b) => b.price - a.price);
      if (filters.sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    }
    return { data: result };
  },
  getProduct: async (id) => {
    await delay(300);
    const product = products.find(p => p.id === parseInt(id));
    if (!product) throw new Error('Product not found');
    return { data: product };
  },
  getRelatedProducts: async (category, currentId, limit = 4) => {
    await delay(200);
    const related = products.filter(p => p.category === category && p.id !== parseInt(currentId)).slice(0, limit);
    return { data: related };
  },
  getCategories: async () => {
    await delay(400);
    return { data: categories };
  },
  getBanners: async () => {
    await delay(200);
    return { data: banners };
  }
};

export default api;
