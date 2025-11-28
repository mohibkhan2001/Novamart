import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Electronics = () => {
  const electronicsCategoriesAllowed = [
    "electronics",
    "smartphones",
    "laptops",
    "tablets",
    "audio",
  ];

  return (
    <CategoryCollection
      title="Electronics"
      description="Shop the latest gadgets and electronic devices with cutting-edge technology."
      allowedCategories={electronicsCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Electronics;