import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductsByIds } from "../api/products"; // Adjust path as needed

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        // fetchProductsByIds expects array of IDs
        const products = await fetchProductsByIds([Number(id)]);
        if (products.length === 0) {
          setError("Product not found.");
        } else {
          setProduct(products[0]);
        }
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-emerald-700">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-red-600">
        <p>{error}</p>
        <Link to="/" className="text-emerald-700 hover:underline mt-4 inline-block">
          &larr; Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link to="/" className="text-emerald-700 hover:underline mb-4 inline-block">
        &larr; Back to home
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product images carousel or first image */}
        <div className="md:w-1/2">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full rounded shadow"
            />
          ) : (
            <div className="bg-gray-200 w-full h-64 flex items-center justify-center rounded">
              No image available
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-emerald-900">{product.title}</h1>
          <p className="text-xl font-semibold text-emerald-700">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-sm text-gray-500">
            Category: <span className="capitalize">{product.category}</span>
          </p>
          <p className="text-sm text-gray-500">Brand: {product.brand}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          <p className="text-sm text-yellow-500 font-semibold">
            Rating: {product.rating} / 5
          </p>

          {/* You can add Add to Cart button here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
