// src/pages/ProductsPage.jsx
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import Home_product_cards from "../components/Home Page/Home_product_cards";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  // optional: wire category selection to hook
  const { products, total, loading, error, limit, skip, next, prev } =
    useProducts({ initialLimit: 12, initialSkip: 0, query: search });

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

  const gridVariants = {
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
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-4xl font-extrabold text-emerald-950">Shop All</h2>
          <span>Easy shopping now</span>
        </div>

        <motion.div className="flex gap-2 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-950 transition-all"
          />
        </motion.div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 text-lg">Loading products…</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-red-500 text-lg">Error: {error.message}</p>
        </motion.div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mb-8"
          variants={gridVariants}
          initial="initial"
          animate="animate"
        >
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
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg">
            No products found. Try a different search.
          </p>
        </motion.div>
      )}

      {/* Pagination Section */}
      {!loading && !error && products.length > 0 && (
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-2">
            <motion.button
              onClick={prev}
              disabled={skip === 0}
              className="px-4 py-2 border border-emerald-950 rounded-lg text-emerald-950 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-950 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>
            <motion.button
              onClick={next}
              disabled={products.length < limit}
              className="px-4 py-2 border border-emerald-950 rounded-lg text-emerald-950 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-950 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>
          <motion.div className="text-sm text-gray-600 font-medium">
            Showing{" "}
            <span className="text-emerald-950 font-bold">
              {products.length}
            </span>{" "}
            of{" "}
            <span className="text-emerald-950 font-bold">{total ?? "—"}</span>{" "}
            products
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductsPage;
