import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (produit) => {
    setCartItems(prev => [...prev, produit]);
  };

  const itemCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
