import { useEffect, useState } from "react";
import axios from "axios";

const EXPIRY_MS = 1000 * 60 * 10; // 10 minutes

export const useTopProducts = (ids = []) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `products-${ids.join(",")}`;
  const cacheTimeKey = `${cacheKey}-timestamp`;

  useEffect(() => {
    let mounted = true;

    const loadFromCache = () => {
      const cached = localStorage.getItem(cacheKey);
      const timestamp = localStorage.getItem(cacheTimeKey);
      if (!cached || !timestamp) return null;

      const expired = Date.now() - parseInt(timestamp) > EXPIRY_MS;
      if (expired) return null;

      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    };

    const saveToCache = (data) => {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheTimeKey, Date.now().toString());
    };

    const fetchProducts = async () => {
      setLoading(true);

      // Try cache first
      const cached = loadFromCache();
      if (cached) {
        setProducts(cached);
        setLoading(false);
        return;
      }

      try {
        const responses = await Promise.all(
          ids.map((id) => axios.get(`https://dummyjson.com/products/${id}`))
        );
        const data = responses.map((r) => r.data);

        if (mounted) {
          setProducts(data);
          saveToCache(data);
        }
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => (mounted = false);
  }, [cacheKey, cacheTimeKey, ids]); // re-run when ids change

  return { products, loading, error };
};
