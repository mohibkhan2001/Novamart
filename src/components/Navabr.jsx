import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
      {/* centered container to limit width; remove mx-auto / max-w if you want full-bleed */}
      <div className="w-full max-w-7xl px-6">
        <div
          className="pointer-events-auto flex items-center justify-between gap-6 
                     rounded-xl px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        >
          <h1 className="text-lg font-bold text-white">Ecommerce Store</h1>

          <nav>
            <ul className="flex items-center gap-6 text-md">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-semibold`
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

              <li>
                <NavLink
                  to="/clothes"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-semibold`
                  }
                >
                  <span className="relative">
                    Clothes
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
                <NavLink
                  to="/shoes"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-semibold`
                  }
                >
                  Shoes
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/electronics"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-semibold`
                  }
                >
                  Electronics
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/furniture"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-semibold`
                  }
                >
                  Furniture
                </NavLink>
              </li>

              {/* vertical divider */}
              <li>
                <div className="border-l border-white/30 h-6 mx-4" />
              </li>

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-bold`
                  }
                >
                  About
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive ? navActive : navInActive
                    } font-bold`
                  }
                >
                  Contact
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
