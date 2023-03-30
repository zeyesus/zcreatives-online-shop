import React, { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../context/cart.context";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className=" absolute top-16 right-12 w-60 h-80  flex flex-col p-4 border-2 border-yellow bg-white z-10 rounded-xl shadow-2xl">
      <div className="h-full flex flex-col overflow-scroll">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <button className="btn-large btn-larg-hover">Check out</button>
    </div>
  );
};

export default CartDropDown;
