import React from "react";
import { NavLink } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg"; // Cart icon
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  // styles
  const linkBase =
    "px-4 py-2 rounded-md transition-all duration-200 inline-block transform";
  // active: light/solid chip so it stands out on the glass
  const navActive = "bg-white/30 text-emerald-900 scale-105";
  // inactive: white text on glass, subtle hover
  const navInActive =
    "text-white hover:-translate-y-0.5 hover:scale-105 hover:bg-white/5";

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none select-none">
      <div className="w-full max-w-7xl px-6">
        <div
          className="pointer-events-auto flex items-center justify-between gap-6 
                     rounded-xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        >
          <h1 className="text-lg font-bold text-white">Ecommerce Store</h1>

          <nav>
            <ul className="flex items-center gap-6 text-md">
              {/* Other nav links */}
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? navActive : navInActive} font-semibold`
                  }
                >
                  <span className="relative">
                    Home
                    <span
                      className="absolute left-0 -bottom-1 h-0.5 bg-emerald-300 transition-all duration-200"
                    />
                  </span>
                </NavLink>
              </li>

              {/* Add your other nav items here similarly */}

              {/* Cart Nav Item with count */}
              <li className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${linkBase} flex items-center gap-1 ${
                      isActive ? navActive : navInActive
                    } font-semibold relative`
                  }
                  aria-label="View cart"
                >
                  <CgShoppingCart className="text-white" size={20} />
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span
                      className="absolute -top-2 -right-3 bg-emerald-900 text-white text-xs font-bold rounded-full px-2 py-0.5 select-none"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {cartItems.length}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
