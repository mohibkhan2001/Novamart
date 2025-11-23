import React from "react";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";

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
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center pointer-events-none select-none">
      {/* centered container to limit width; remove mx-auto / max-w if you want full-bleed */}
      <div className="w-full max-w-8xl px-40">
        <div
          className="pointer-events-auto flex items-center justify-between gap-6 
                     rounded-xl px-6 bg-neutral-800/20 backdrop-blur-md border border-white/20 shadow-lg"
        >
          <h1 className="text-lg font-bold text-white">NovaMart</h1>

          <nav>
            <ul className="flex items-center gap-6 text-md text-center flex-nowrap">
              <li>
                <NavLink to="/" end className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">
                    Home
                    <span className="absolute left-0 -bottom-1 h-0.5 bg-emerald-300 transition-all duration-200" />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/clothes" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">
                    Men's Collection
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-emerald-300 transition-all duration-200 ${
                        // simple visual, you can swap this with isActive-controlled width logic if you want
                        "w-0"
                      }`}
                    />
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/shoes" className={getNavLinkClass}>
                <span className="relative whitespace-nowrap">
                  Women's Collection
                </span>
                  
                </NavLink>
              </li>

              <li>
                <NavLink to="/electronics" className={getNavLinkClass}>
                  <span className="relative whitespace-nowra">Home & Lifestyle</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/furniture" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Beauty & care</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/furniture" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Electronics</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/furniture" className={getNavLinkClass}>
                  <span className="relative whitespace-nowrap">Sports</span>
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
  );
};

export default Navbar;
