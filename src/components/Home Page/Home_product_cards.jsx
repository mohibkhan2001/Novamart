/* eslint-disable no-undef */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";

const placeholderImg = "https://via.placeholder.com/400x300?text=No+Image";

const Home_product_cards = ({ product = {}, index = 0, onClick }) => {
  const {
    title = "Product",
    price = 0,
    rating = 0,
    images = [],
    discountPercentage = null,
  } = product;

  // Optimize image URL for faster loading (reduce size & quality for thumbnails)
  const optimizeImageUrl = (url) => {
    if (!url) return placeholderImg;
    // Remove existing query params and add compression
    return url.replace(/\?.*$/, '') + '?w=300&q=75&auto=format';
  };

  const imageSrc = images && images.length ? optimizeImageUrl(images[0]) : placeholderImg;

  const getStars = (ratingValue) => {
    const cleanRating = Number(Number(ratingValue || 0).toFixed(1));
    const stars = [];
    const full = Math.floor(cleanRating);
    const half = cleanRating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 w-3 h-3 md:w-4 md:h-4" />
      );
    }
    if (half && full < 5) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-3 h-3 md:w-4 md:h-4" />
      );
    }
    for (let i = 0; i < empty; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-3 h-3 md:w-4 md:h-4" />
      );
    }
    return stars;
  };

  const formatPrice = (p) =>
    typeof p === "number" ? `$${p.toFixed(2)}` : String(p);

  return (
    <motion.div
      // GPU hint + will-change to avoid compositor jank
      className={
        "w-full max-w-[16rem] p-4 rounded-2xl " +
        "border border-gray-200 bg-white shadow-lg cursor-pointer transition-all relative " +
        "md:w-70 md:h-100 md:px-6 md:py-4 md:rounded-4xl transform-gpu will-change-transform"
      }
      // only animate transform + opacity (cheap on compositor)
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      layout={false} // disable Framer layout animations
      transition={{
        duration: 0.36,
        ease: "easeOut",
        delay: Math.min(index * 0.04, 0.12),
      }}
      onClick={() => onClick && onClick(product)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) onClick(product);
      }}
      // small inline style to help a few mobile browsers with flicker
      style={{
        // ensure the browser knows this element will transform; small 3D hint
        transform: "translateZ(0)",
        // hide backface to reduce flicker when compositing
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
      }}
    >
      {/* IMPORTANT: use aspect-* to reserve space and prevent layout shift */}
      <div className="w-full relative overflow-hidden rounded-2xl flex items-center justify-center bg-gray-100 aspect-square md:aspect-auto">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover will-change-auto transition-opacity duration-300"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          fetchPriority="low"
          onError={(e) => {
            e.target.src = placeholderImg;
          }}
        />

        {discountPercentage !== null && (
          <span
            className={
              "absolute right-0 top-0 text-xs text-white bg-emerald-800 rounded-full font-medium flex items-center justify-center " +
              "w-8 h-8 md:w-10 md:h-10 md:text-xs md:top-2 md:right-2"
            }
          >
            {Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-gray-700 truncate text-sm md:text-base">
            {title}
          </h2>

          <span className="flex gap-1 items-center text-gray-700">
            {getStars(rating)}
            <span className="text-xs md:text-sm text-gray-500 ml-2">
              ({rating?.toFixed?.(1) ?? rating})
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center mt-1">
          <h2
            className={
              "text-white font-bold text-xs bg-emerald-950 px-2 py-1 rounded-full " +
              "md:text-2xl md:px-4 md:py-2"
            }
          >
            {formatPrice(price)}
          </h2>

          <button
            className={
              "text-emerald-950 border-emerald-950 border-2 rounded-lg cursor-pointer" +
              "text-sm p-1 hover:shadow hover:scale-110 transition-all " +
              "md:text-2xl md:p-2"
            }
            title="Add to cart"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart clicked for", product.id);
            }}
            aria-label={`Add ${title} to cart`}
          >
            <CgShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home_product_cards;
