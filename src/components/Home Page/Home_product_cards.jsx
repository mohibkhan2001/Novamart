/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";

/**
 * Home_product_cards
 * Props:
 *  - product: {
 *      id, title, price, rating, images: [url,...], discountPercentage
 *    }
 */
const Home_product_cards = ({ product = {}, index = 0, onClick  }) => {
  const {
    title = "Product",
    price = 0,
    rating = 0,
    images = [],
    discountPercentage = null,
  } = product;

  const imageSrc = images && images.length ? images[0] : placeholderImg;

  // rating => array of icons (full, half, empty)
  const getStars = (ratingValue) => {
    const cleanRating = Number(ratingValue.toFixed(1)); // avoid floating errors

    const stars = [];
    const full = Math.floor(cleanRating);
    const half = cleanRating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 w-4 h-4" />
      );
    }

    if (half && full < 5) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-4 h-4" />
      );
    }

    for (let i = 0; i < empty; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-4 h-4" />
      );
    }

    return stars;
  };

  const formatPrice = (p) =>
    typeof p === "number" ? `$${p.toFixed(2)}` : String(p);

  return (
    <motion.div
      className="h-100 w-70 border border-gray-200 rounded-4xl shadow-lg px-6 py-4 relative bg-white  transition-all "
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className="w-full h-[60%] flex justify-center items-center relative overflow-hidden rounded-2xl">
        <img
          src={imageSrc}
          alt={title}
          className="h-full object-cover max-h-56"
        />

        {discountPercentage !== null && (
          <span className="text-white bg-emerald-800 rounded-full font-semibold w-10 h-10 flex justify-center items-center p-2 absolute right-2 top-2 text-xs">
            {Math.round(discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-gray-700 truncate">{title}</h2>
          <span className="flex gap-1 items-center text-gray-700">
            {getStars(rating)}
            <span className="text-sm text-gray-500 ml-2">
              ({rating?.toFixed?.(1) ?? rating})
            </span>
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-2xl bg-emerald-950 px-4 py-2 rounded-full">
            {formatPrice(price)}
          </h2>

          <button
            className="text-emerald-950 border-emerald-950 border-2 text-2xl p-2 rounded-xl cursor-pointer hover:shadow hover:scale-110 transition-all"
            title="Add to cart"
            onClick={() => {
              console.log("Add to cart clicked for", product.id);
            }}
          >
            <CgShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home_product_cards;
