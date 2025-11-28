import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Sports = () => {
  const sportsCategoriesAllowed = [
    "sports-accessories",
    "sports-shoes",
    "sports-clothing",
    "fitness-equipment",
  ];

  return (
    <CategoryCollection
      title="Sports"
      description="Gear up for your active lifestyle with premium sports and fitness products."
      allowedCategories={sportsCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Sports;