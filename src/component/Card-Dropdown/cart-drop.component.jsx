import React, { useContext } from "react";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../context/cart.context";
import { Link } from "react-router-dom";
const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className=" absolute top-16 right-12 w-60 h-80  flex flex-col p-4 border-2 border-yellow bg-white z-10 rounded-xl shadow-2xl">
      <div className="h-full flex flex-col overflow-scroll">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to={"/cart"} className="btn-large btn-larg-hover text-center">
        Check out
      </Link>
    </div>
  );
};

export default CartDropDown;
