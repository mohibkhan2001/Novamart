import React from "react";
import CategoryCollection from "../../components/CategoryCollection";

const Home_Lifestyle = () => {
  const homeLifestyleCategoriesAllowed = [
    "furniture",
    "home-decoration",
    "kitchen-accessories",
  ];

  return (
    <CategoryCollection
      title="Home & Lifestyle"
      description="Transform your living space with our curated home and lifestyle collection."
      allowedCategories={homeLifestyleCategoriesAllowed}
      productsPerCategory={20}
    />
  );
};

export default Home_Lifestyle;