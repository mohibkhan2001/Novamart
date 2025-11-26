// src/pages/ProductsPage.jsx
import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  // optional: wire category selection to hook
  const { products, total, loading, error, limit, skip, next, prev, goToPage } =
    useProducts({ initialLimit: 12, initialSkip: 0, query: search });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">All Products</h2>

        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="px-3 py-2 rounded border"
          />
        </div>
      </div>

      {loading && <div>Loading products…</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-3">
            <img src={p.thumbnail || p.images?.[0]} alt={p.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-sm font-medium">{p.title}</h3>
            <p className="text-sm text-gray-600">${p.price}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <button onClick={prev} disabled={skip === 0} className="px-3 py-1 border rounded mr-2">Prev</button>
          <button onClick={next} disabled={products.length < limit} className="px-3 py-1 border rounded">Next</button>
        </div>
        <div className="text-sm text-gray-600">
          Showing {products.length} of {total ?? "—"} products
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
