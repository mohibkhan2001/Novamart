import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Womens_collection = () => {
  const womensCategoriesAllowed = [
    "beauty",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  return (
    <CategoryCollection
      title="Women's Collection"
      description="Discover the latest trends in women's fashion and accessories."
      allowedCategories={womensCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Womens_collection;