import React, { createContext, useContext, useState } from "react";

// Create a new context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart context provider component
export const CartProvider = ({ children }) => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  // Context value
  const value = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  // Provide the context value to children components
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
