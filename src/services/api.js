import { products, categories, banners } from "../data/groceries";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  getProducts: async (filters = {}) => {
    await delay(600);
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.featured) {
      filtered = filtered.filter((p) => p.featured);
    }

    if (filters.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return { data: filtered, total: filtered.length };
  },

  getProductById: async (id) => {
    await delay(400);
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) throw new Error("Product not found");

    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return { data: product, related };
  },

  getCategories: async () => {
    await delay(300);
    return { data: categories };
  },

  getBanners: async () => {
    await delay(200);
    return { data: banners };
  },

  searchProducts: async (query) => {
    await delay(400);
    if (!query) return { data: [] };
    const q = query.toLowerCase();
    const results = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 8);
    return { data: results };
  },
};

export default api;