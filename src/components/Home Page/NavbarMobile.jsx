// NavbarMobile.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";

const MobileLink = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-4 py-3 text-lg ${
        isActive ? "text-emerald-800" : "text-gray-800"
      }`
    }
  >
    {children}
  </NavLink>
);

const NavbarMobile = ({ toggleCart }) => {
  const [open, setOpen] = useState(false);

  // `render` keeps the menu mounted while closing animation runs
  const [render, setRender] = useState(false);
  useEffect(() => {
    let t;
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRender(true);
    } else {
      // wait for animation to finish before unmounting
      t = setTimeout(() => setRender(false), 300); // match transition duration
    }
    return () => clearTimeout(t);
  }, [open]);

  const handleToggle = () => setOpen((s) => !s);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        onClick={handleToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        className="p-2 text-2xl text-gray-700 pointer-events-auto"
      >
        {open ? <RxCross2 /> : <RxHamburgerMenu />}
      </button>

      {render && (
        // fixed container stays mounted while animating
        <div className="fixed inset-0 z-50">
          {/* Overlay: fades in/out */}
          <div
            // when open => opacity-50, when closed => opacity-0 + pointer-events-none
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              open ? "opacity-50" : "opacity-0 pointer-events-none"
            }`}
            onClick={close}
            aria-hidden
          />

          {/* Sliding panel: translate-x-full => offscreen; translate-x-0 => visible */}
          <nav
            className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-4 transform transition-transform duration-500 ease-out
              ${open ? "translate-x-0" : "translate-x-full"}`}
            aria-hidden={!open}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl px-3 text-emerald-950">
                Novamart
              </h2>
              <button
                onClick={close}
                className="text-2xl p-1"
                aria-label="Close menu"
              >
                <RxCross2 />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              <li>
                <MobileLink to="/" onClick={close}>
                  Home
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/men's_collection" onClick={close}>
                  Men's Collection
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/women's_collection" onClick={close}>
                  Women's Collection
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/home_lifestyle" onClick={close}>
                  Home & Lifestyle
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/beauty_care" onClick={close}>
                  Beauty & Care
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/electronics" onClick={close}>
                  Electronics
                </MobileLink>
              </li>
              <li>
                <MobileLink to="/sports" onClick={close}>
                  Sports
                </MobileLink>
              </li>
            </ul>

            <div className="mt-6 border-t pt-4">
              <button
                onClick={() => {
                  if (toggleCart) toggleCart();
                  close();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-950 text-white rounded-md"
              >
                <LuShoppingCart /> My Cart
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
