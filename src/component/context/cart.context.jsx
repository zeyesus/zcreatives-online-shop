import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});
export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIscartOpen] = useState(false);
  const value = { isCartOpen, setIscartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
