import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const CartSidebar = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={toggleCart}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col border-l-4 border-emerald-900`}
        aria-label="Shopping cart sidebar"
      >
        <header className="flex justify-between items-center p-5 border-b border-emerald-900">
          <h2 className="text-xl font-bold text-emerald-900 tracking-wide">
            Your Cart
          </h2>
          <button
            onClick={toggleCart}
            className="text-emerald-900 hover:text-emerald-700 transition-colors"
            aria-label="Close cart sidebar"
          >
            <IoIosCloseCircleOutline size={25} />
          </button>
        </header>

        <section className="flex-grow overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-emerald-900 italic text-center mt-10">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between flex-col  p-3 border border-emerald-900 rounded-md"
              >
                <div className="flex flex-col max-w-[60%]">
                  <span className="text-emerald-900 font-medium truncate">
                    {item.title}
                  </span>
                  <span className="text-sm text-emerald-700">
                    ${item.price.toFixed(2)} each
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex gap-6">
                    <button
                      className=" text-emerald-900  rounded-full  cursor-pointer"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-emerald-900 font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className=" text-emerald-900  rounded-full px-2 cursor-pointer"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <div>
                    <button
                      className="text-gray-400 hover:text-red-800 transition-colors font-semibold ml-4 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      <MdDelete size={30} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <footer className="p-5 border-t border-emerald-900 bg-white flex justify-between items-center font-bold text-emerald-900 text-lg">
          <span>Total:</span>
          <span>
            $
            {cartItems
              .reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)
              .toFixed(2)}
          </span>
        </footer>
      </aside>
    </>
  );
};

export default CartSidebar;
