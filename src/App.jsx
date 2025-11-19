import React, { useCallback, useEffect, useState } from "react";
import Home from "./pages/Home";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import AppRoutes from "./pages/AppRoutes";

const App = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = axios.get(API_URL);
      setProducts((await response).data);
      console.log(response);
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
        <div>
        <Navbar />
        <Outlet/>
      </div>
      <AppRoutes/>
    </div>
  );
};

export default App;
