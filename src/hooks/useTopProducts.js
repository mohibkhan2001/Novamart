import { useEffect, useState, useCallback } from "react";
import { fetchProductsByIds } from "../api/products";

export const useTopProducts = (ids = []) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    if (!ids || ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let mounted = true;

    try {
      setLoading(true);
      setError(null);

      // Fetch products with built-in caching
      const data = await fetchProductsByIds(ids);

      if (mounted) {
        setProducts(data);
      }
    } catch (err) {
      if (mounted) {
        setError(err?.message || "Failed to fetch products");
        setProducts([]);
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [ids]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error };
};
