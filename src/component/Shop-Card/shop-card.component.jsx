import React, { useContext } from "react";
import { CartContext } from "../context/cart.context";

const ShopCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className="h-72 flex flex-col hover:scale-95  transition-all gap-y-1 shadow-xl bg-white rounded-lg overflow-clip ">
      <img src={imageUrl} className="object-cover overflow-hidden " />

      <span>{name}</span>
      <span>{price}</span>
      <button
        className="btn-large btn-outline-hover"
        onClick={addProductToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ShopCard;
