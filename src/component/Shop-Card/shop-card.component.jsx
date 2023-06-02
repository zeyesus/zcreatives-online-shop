import React, { useContext } from "react";
import { CartContext } from "../context/cart.context";

const ShopCard = ({ product, popup, setpopup, setPopupProducts }) => {
  const { productName, price, catagory, description, productImage } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className=" hover:scale-95 h-[480px] transition-all gap-y-1 shadow-xl bg-white rounded-lg  ">
      <img
        src={productImage}
        onClick={() => {
          setpopup(!popup);
          setPopupProducts(product);
        }}
        className="object-cover h-3/4 overflow-hidden"
      />
      <div className="flex flex-col p-1">
        <div className="flex justify-between">
          <h2 className="font-semibold text-lg">{productName}</h2>
          <h3>
            <span className="font-semibold text-sm w-fit bg-gray-200 rounded-xl px-2">
              {price}
            </span>{" "}
            birr
          </h3>
        </div>

        <div className="flex gap-x-2 text-secondaryDark ">
          Catgory:
          <span className=" w-fit text-black bg-gray-200 rounded-xl px-2">
            {catagory}
          </span>
        </div>
        <span className="text-secondaryDark">
          {description.slice(0, 35)}...
        </span>

        <button
          className="btn-large btn-outline-hover"
          onClick={addProductToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
