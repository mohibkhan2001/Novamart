import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [_products, setProducts] = useState([]);
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const getAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = axios.get(API_URL);
      setProducts((await response).data);
    } catch (error) {
      if (error) {
        setError("Failed to fetch products. Please try again.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, [API_URL]);
  useEffect(
    function () {
      getAllProducts();
    },
    [getAllProducts]
  );

  return (
    <div>
      <Navbar toggleCart={toggleCart} />
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </div>
  );
};

export default App;

