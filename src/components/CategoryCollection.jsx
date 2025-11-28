import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAllCategories, fetchProductsByCategory, fetchProductsByCategories } from "../api/products";
import Home_product_cards from "./Home Page/Home_product_cards";

/**
 * Reusable CategoryCollection component
 * @param {Object} props
 * @param {string} props.title - Page title (e.g., "Men's Collection")
 * @param {string} props.description - Page description
 * @param {Array} props.allowedCategories - Array of category slugs to filter/display
 * @param {number} props.productsPerCategory - Number of products to fetch per category (default 20)
 */
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

  const handleCategoryClick = (category) => {
    const categoryName =
      typeof category === "string" ? category : category.slug;
    setSelectedCategory(categoryName);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
  };

  // Fetch products when category changes (or load all if none selected)
  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        let fetchedProducts = [];

        if (selectedCategory) {
          // Fetch products from the selected category
          fetchedProducts = await fetchProductsByCategory(selectedCategory, 30);
        } else {
          // Load all products from all allowed categories
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

  // Fetch and filter categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchAllCategories();

        // Filter to show only allowed categories
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

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const filterVariants = {
    initial: { opacity: 0, x: -10 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const filterItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
  };

  const headerVariants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const productsVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delayChildren: 0.2,
        staggerChildren: 0.03,
      },
    },
  };

  return (
    <motion.section
      className="flex flex-col gap-10 items-center py-10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key={title} // Key ensures fresh animation when page changes
    >
      {/* Category Filters */}
      <motion.div
        className="filters_bar w-fit px-10 py-4 flex justify-center lg:gap-20 gap-8 flex-wrap"
        variants={filterVariants}
        initial="initial"
        animate="animate"
      >
        {loading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : categories.length > 0 ? (
          <>
            {/* Show All Button */}
            <motion.button
              onClick={handleShowAll}
              className={`${BaseStyle} ${
                !selectedCategory
                  ? "bg-emerald-950 text-white hover:bg-emerald-900"
                  : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
              variants={filterItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Show All</span>
            </motion.button>

            {/* Category Buttons */}
            {categories.map((category, idx) => {
              const categoryName =
                typeof category === "string" ? category : category.slug;
              const isSelected = categoryName === selectedCategory;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleCategoryClick(category)}
                  className={`${BaseStyle} ${
                    isSelected
                      ? "bg-emerald-950 text-white hover:bg-emerald-900"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                  variants={filterItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="capitalize">
                    {typeof category === "string" ? category : category.name}
                  </span>
                </motion.button>
              );
            })}
          </>
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </motion.div>

      {/* Page Header */}
      <motion.div
        className="flex w-full flex-col justify-center items-center"
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-5xl text-emerald-950 font-extrabold font-primary-extraBold">
          {title}
        </h1>
        <span className="text-gray-600 text-sm mt-2 block font-primary-medium font-extrabold">
          {description}
        </span>
      </motion.div>

      {/* Products Display */}
      {loadingProducts ? (
        <motion.div
          className="w-full text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg">Loading products...</p>
        </motion.div>
      ) : products.length > 0 ? (
        <motion.div
          className="w-full px-4 sm:px-6 lg:px-8 py-12"
          variants={productsVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div className="flex flex-wrap gap-16 justify-center items-center">
            {products.map((product, idx) => (
              <motion.div
                key={product.id ?? idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: idx * 0.03,
                }}
              >
                <Home_product_cards
                  product={product}
                  index={idx}
                  onClick={(prod) => console.log("Clicked product:", prod.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="w-full text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg">
            {selectedCategory
              ? "No products found in this category."
              : "Select a category to view products."}
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default CategoryCollection;
