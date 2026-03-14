import { useState, useEffect } from "react";
import api from "../services/api";

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filtersStr = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const parsedFilters = JSON.parse(filtersStr);
        const { data } = await api.getProducts(parsedFilters);
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [filtersStr]);

  return { products, loading, error };
};

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, related: rel } = await api.getProductById(id);
        if (!cancelled) {
          setProduct(data);
          setRelated(rel);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    if (id) fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, related, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.getCategories();
        setCategories(data);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
};

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const search = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    try {
      const { data } = await api.searchProducts(query);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return { results, searching, search, setResults };
};