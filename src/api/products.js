// src/api/products.js
const BASE = import.meta.env.VITE_API_URL; // https://dummyjson.com/products

export function buildProductsUrl({ limit = 30, skip = 0, q, category } = {}) {
  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("skip", String(skip));
  if (q) params.set("q", q);           // optional search param if API supports it
  if (category) params.set("category", category);

  return `${BASE}?${params.toString()}`;
}

export async function fetchProducts({ limit = 0, skip = 0, q, category } = {}) {
  const url = buildProductsUrl({ limit, skip, q, category });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data = await res.json();
  // dummyjson returns { products: [...], total, skip, limit }
  return data;
}
