import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

// CartSidebar.jsx

const CartSidebar = ({ isOpen, toggleCart }) => {
  return (
    <>
      {/* 1. Backdrop/Overlay: Only visible when isOpen is true */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 w-full"
          onClick={toggleCart}
        ></div>
      )}

      {/* 2. Sidebar Container */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } // Conditional translation
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          {/* Close Button: Attached to the toggleCart function */}
          <button
            onClick={toggleCart}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoIosCloseCircleOutline  className="cursor-pointer text-emerald-900" size={25} />
          </button>
        </div>

        {/* Cart items list goes here... */}
        <div className="p-4">
          <p>Item 1: $10.00</p>
          <p>Item 2: $25.00</p>
          <div className="mt-4 pt-4 border-t font-bold">Total: $35.00</div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
