import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Mens_collection from "./Categories/Mens_collection";
import Womens_collection from "./Categories/Womens_collection";
import Home_Lifestyle from "./Categories/Home_Lifestyle";
import Beauty_care from "./Categories/Beauty_care";
import Electronics from "./Categories/Electronics";
import Sports from "./Categories/Sports";
import ProductsPage from "./ProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="men's_collection" element={<Mens_collection />} />
        <Route path="women's_collection" element={<Womens_collection />} />
        <Route path="home_lifestyle" element={<Home_Lifestyle />} />
        <Route path="beauty_care" element={<Beauty_care />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="sports" element={<Sports />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
