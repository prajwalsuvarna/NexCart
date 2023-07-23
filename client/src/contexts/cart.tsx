import { useState, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hooks

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
