import React, { Fragment, useContext } from "react";
import { CartContext } from "../context/cart.context";

const CheckOutItem = ({ cartItem }) => {
  const { id, productName, productImage, price, quantity } = cartItem;
  const { removeItemToCart, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);
  return (
    <Fragment>
      <div key={id} className="flex justify-between p-2 w-5/6  font-semibold">
        <img src={productImage} className="w-20" />
        <h2>{productName}</h2>
        <span className="flex gap-2">
          <div onClick={removeItemHandler}>"-"</div>
          {quantity}
          <span onClick={addItemHandler}>"+"</span>
        </span>
        <span>{price * quantity}</span>

        <span onClick={clearItemHandler}>Remove</span>
      </div>
    </Fragment>
  );
};

export default CheckOutItem;
