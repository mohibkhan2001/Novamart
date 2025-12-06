import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCategories,
  fetchProductsByCategory,
  fetchProductsByCategories,
} from "../api/products";
import Home_product_cards from "./Home Page/Home_product_cards";

const CategoryCollection = ({
  title = "Collection",
  description = "Explore our latest collection",
  allowedCategories = [],
  productsPerCategory = 20,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const navigate = useNavigate(); // ✅ ADD THIS

  // 👉 Handler for navigating to product detail
  const goToDetail = (product) => {
    if (!product?.id) return;
    navigate(`/product/${product.id}`);
  };

  const handleCategoryClick = (category) => {
    const categoryName =
      typeof category === "string" ? category : category.slug;
    setSelectedCategory(categoryName);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
  };

  // Fetch products when category changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        let fetchedProducts = [];

        if (selectedCategory) {
          fetchedProducts = await fetchProductsByCategory(
            selectedCategory,
            30
          );
        } else {
          fetchedProducts = await fetchProductsByCategories(
            allowedCategories,
            productsPerCategory
          );
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [selectedCategory, allowedCategories, productsPerCategory]);

  // Fetch and filter categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories();

        const filtered = fetchedCategories.filter((category) => {
          const categoryName =
            typeof category === "string" ? category : category.slug;
          return allowedCategories.includes(categoryName);
        });

        setCategories(filtered);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [allowedCategories]);

  const BaseStyle =
    "px-4 py-2 rounded-full font-primary-medium font-bold text-sm w-34 min-w-fit text-center cursor-pointer transition-all whitespace-nowrap";

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="flex flex-col gap-10 items-center py-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key={title}
    >
      {/* Category Filters */}
      <div className="filters_bar w-fit px-10 py-4 flex justify-center lg:gap-20 gap-8 flex-wrap">
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length > 0 ? (
          <>
            <button
              onClick={handleShowAll}
              className={`${BaseStyle} ${
                !selectedCategory
                  ? "bg-emerald-950 text-white hover:bg-emerald-900"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Show All
            </button>

            {categories.map((category, idx) => {
              const categoryName =
                typeof category === "string" ? category : category.slug;
              const isSelected = categoryName === selectedCategory;

              return (
                <button
                  key={idx}
                  onClick={() => handleCategoryClick(category)}
                  className={`${BaseStyle} ${
                    isSelected
                      ? "bg-emerald-950 text-white hover:bg-emerald-900"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  <span className="capitalize">
                    {typeof category === "string" ? category : category.name}
                  </span>
                </button>
              );
            })}
          </>
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>

      {/* Page Header */}
      <div className="flex w-full flex-col justify-center items-center">
        <h1 className="text-5xl text-emerald-950 font-extrabold font-primary-extraBold">
          {title}
        </h1>
        <span className="text-gray-600 text-sm mt-2 block font-primary-medium font-extrabold">
          {description}
        </span>
      </div>

      {/* Products Grid */}
      {loadingProducts ? (
        <div className="w-full text-center py-20">
          <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap gap-16 justify-center items-center">
            {products.map((product, idx) => (
              <Home_product_cards
                key={product.id ?? idx}
                product={product}
                index={idx}
                onClick={goToDetail} // 👉 FIX ADDED HERE
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full text-center py-20">
          <p className="text-gray-500 text-lg">
            {selectedCategory
              ? "No products found in this category."
              : "Select a category to view products."}
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default CategoryCollection;
