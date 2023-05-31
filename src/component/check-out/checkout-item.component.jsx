import React, { Fragment, useContext } from "react";
import { CartContext } from "../context/cart.context";
import { MdDeleteForever } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
const CheckOutItem = ({ cartItem }) => {
  const { id, productName, productImage, price, quantity, size } = cartItem;
  const { removeItemToCart, addItemToCart, clearItemFromCart } =
    useContext(CartContext);

  // const addItemHandler = () => addItemToCart(cartItem);
  // const removeItemHandler = () => removeItemToCart(cartItem);
  // const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <Fragment>
      <tbody className="text-xl">
        <tr key={`${id}-${size}`}>
          <td>
            <img src={productImage} className="w-20  h-10 object-cover" />
          </td>
          <td>{productName}</td>
          <td>{size}</td>
          <td>
            <div className="flex items-center gap-2 border-gray-300 border-2 rounded-lg w-fit ">
              <span
                onClick={() => removeItemToCart(cartItem)}
                className="hover:bg-gray-300 border-gray-300 border-r-2 w-fit p-2"
              >
                <AiOutlineMinusCircle className="text-xl" />
              </span>
              <span className="p-2">{quantity}</span>

              <span
                onClick={() => addItemToCart(cartItem)}
                className="hover:bg-gray-300 border-gray-300 border-l-2 w-fit p-2"
              >
                <AiOutlinePlusCircle className="text-xl" />
              </span>
            </div>
          </td>
          <td>{price * quantity}</td>
          <td>
            {" "}
            <span
              onClick={() => clearItemFromCart(cartItem)}
              className="flex gap-2 text-lg items-center"
            >
              Remove <MdDeleteForever />
            </span>
          </td>
        </tr>
      </tbody>
    </Fragment>
  );
};

export default CheckOutItem;
