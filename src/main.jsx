import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./pages/AppRoutes.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  </BrowserRouter>
);
