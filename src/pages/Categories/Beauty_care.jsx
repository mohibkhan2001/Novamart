import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Beauty_care = () => {
  const beautyCategoriesAllowed = [
    "beauty",
    "fragrances",
    "skin-care",
    "bath-body",
  ];

  return (
    <CategoryCollection
      title="Beauty & Care"
      description="Discover premium beauty and personal care products for your skincare routine."
      allowedCategories={beautyCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Beauty_care;