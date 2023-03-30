import React from "react";

const CartItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className="text-primaryDark font-medium flex items-center gap-x-3 mt-2 border-b-2">
      <img src={imageUrl} className="w-16 rounded-lg  " />
      <div>
        <h2>{name}</h2>
        <span className="bg-lightDark px-2 py-0 rounded-md">{quantity}</span>
        <span className="mx-2">X</span>
        <span>{price}$</span>
      </div>
    </div>
  );
};

export default CartItem;
