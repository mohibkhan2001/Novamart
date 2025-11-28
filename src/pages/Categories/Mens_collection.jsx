import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Mens_collection = () => {
  const mensCategoriesAllowed = [
    "fragrances",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "sunglasses",
  ];

  return (
    <CategoryCollection
      title="Men's Collection"
      description="Explore the latest styles and trends in men's fashion."
      allowedCategories={mensCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Mens_collection;
