import React from "react";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import NavbarMobile from "./Home Page/NavbarMobile";

const Navbar = ({ toggleCart }) => {
  // styles
  const linkBase =
    "px-4 py-2 rounded-md transition-all duration-200 inline-block transform";

  const getNavLinkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? navActive : navInActive} `;
  // active: light/solid chip so it stands out on the glass
  const navActive = "bg-white/30 text-white scale-105";
  // inactive: white text on glass, subtle hover
  const navInActive =
    "text-white hover:-translate-y-0.5 hover:scale-105 hover:bg-white/5";

  return (
    <>
      {/* Mobile hamburger placed outside header so header can be hidden on mobile */}
      <div className="fixed top-4 right-4 z-50 md:hidden pointer-events-auto">
        <NavbarMobile toggleCart={toggleCart} />
      </div>

      <header className="hidden md:flex top-4 left-0 right-0 z-40 justify-center pointer-events-none select-none">
      <div className="w-full ">
        <div
          className="w-full pointer-events-auto flex items-center justify-between gap-6 
                      px-6 bg-emerald-950"
        >
          <h1 className="text-2xl font-bold text-emerald-900">NovaMart</h1>

          <nav>
            <ul className="hidden md:flex items-center gap-6 text-md text-center flex-nowrap">
              <li>
                <NavLink to="/" end className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">
                    Home
                    <span className="absolute left-0 -bottom-1 h-0.5 bg-emerald-300 transition-all duration-200" />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/men's_collection" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Men's Collection</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/women's_collection" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Women's Collection</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/home_lifestyle" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Home & Lifestyle</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/beauty_care" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Beauty & care</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/electronics" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Electronics</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/sports" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Sports</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Shop All</span>
                </NavLink>
              </li>

              {/* vertical divider */}
              <li>
                <div className="border-l border-white/30 h-6 mx-4" />
              </li>

              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={toggleCart}
                  className="px-2 rounded-md"
                  aria-label="Toggle cart"
                >
                  <LuShoppingCart size={25} color="white" title="My Cart" />
                </NavLink>
              </li>
            </ul>

            
          </nav>
        </div>
      </div>
      </header>
    </>
  );
};

export default Navbar;
