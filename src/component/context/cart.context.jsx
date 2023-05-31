import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd, setcartItems) => {
  // setcartItems((prevProducts) => {
  //   const existingProductIndex = prevProducts.findIndex(
  //     (p) => p.id === productToAdd.id && p.size === productToAdd.size
  //   );
  //   if (existingProductIndex !== -1) {
  //     const updatedProducts = [...prevProducts];
  //     updatedProducts[existingProductIndex].quantity += 1;
  //     return updatedProducts;
  //   } else {
  //     return [...prevProducts, { ...productToAdd, quantity: 1 }];
  //   }
  // });
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.id == productToAdd.id && cartItem.size == productToAdd.size
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id == productToAdd.id && cartItem.size == productToAdd.size
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove, setcartItems) => {
  const existingProductIndex = cartItems.findIndex(
    (p) => p.id === cartItemToRemove.id && p.size === cartItemToRemove.size
  );
  if (existingProductIndex !== -1) {
    const updatedProducts = [...cartItems];

    if (updatedProducts[existingProductIndex].quantity > 1) {
      updatedProducts[existingProductIndex].quantity -= 1;
    } else {
      updatedProducts.splice(existingProductIndex, 1);
    }
    return updatedProducts;
  } else {
    return cartItems;
  }
  ////////////////////////////////////////////////////////////////////////
  // const existingCartItem = cartItems.find(
  //   (cartItem) =>
  //     cartItem.id == cartItemToRemove.id &&
  //     cartItem.size == cartItemToRemove.size
  // );
  // if (existingCartItem.quantity == 1) {
  //   return cartItems.filter(
  //     (cartItem) =>
  //       // cartItem.id !== cartItemToRemove.id &&
  //       cartItem.size !== cartItemToRemove.size
  //   );
  // }
  // return cartItems.map((cartItem) =>
  //   cartItem.id == cartItemToRemove.id && cartItem.size == cartItemToRemove.size
  //     ? { ...cartItem, quantity: cartItem.quantity - 1 }
  //     : cartItem
  // );
  //////////////////////////////////////////////////////////////////////////////
};

const clearCartItem = (cartItems, cartItemToBeCleared) => {
  const existingProductIndex = cartItems.findIndex(
    (p) =>
      p.id === cartItemToBeCleared.id && p.size === cartItemToBeCleared.size
  );
  if (existingProductIndex !== -1) {
    const updatedProducts = [...cartItems];
    updatedProducts.splice(existingProductIndex, 1);
    return updatedProducts;
  } else {
    return cartItems;
  }

  // return cartItems.filter(
  //   (cartItem) =>
  //     cartItem.id !== cartItemToBeCleared.id &&
  //     cartItem.size !== cartItemToBeCleared.size
  // );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setcartItems: () => {},
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIscartOpen] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartcount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartcount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setcartItems(addCartItem(cartItems, productToAdd, setcartItems));
  };
  const removeItemToCart = (cartItemToRemove) => {
    setcartItems(removeCartItem(cartItems, cartItemToRemove, setcartItems));
  };
  const clearItemFromCart = (cartItemToBeCleared) => {
    setcartItems(clearCartItem(cartItems, cartItemToBeCleared));
  };

  const value = {
    isCartOpen,
    setIscartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    setcartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
