// src/hooks/useProducts.js
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../api/products";

export function useProducts({ initialLimit = 30, initialSkip = 0, query = "", category = "" } = {}) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(null);
  const [limit, setLimit] = useState(initialLimit);
  const [skip, setSkip] = useState(initialSkip);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  useEffect(() => {
    // cancel previous
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let mounted = true;
    setLoading(true);
    setError(null);

    fetchProducts({ limit, skip, q: query, category })
      .then((data) => {
        if (!mounted) return;
        setProducts(data.products || []);
        setTotal(data.total ?? null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      ctrl.abort();
    };
  // trigger when these change
  }, [limit, skip, query, category]);

  // helpers
  const goToPage = (pageIndex) => setSkip(pageIndex * limit);
  const next = () => setSkip((s) => s + limit);
  const prev = () => setSkip((s) => Math.max(0, s - limit));
  const setPageSize = (newLimit) => {
    setLimit(newLimit);
    setSkip(0); // reset to first page when page size changes
  };

  return {
    products,
    total,
    limit,
    skip,
    loading,
    error,
    setLimit: setPageSize,
    setSkip,
    goToPage,
    next,
    prev,
  };
}
