import React, { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import { CartContext } from "../context/cart.context";

const ShowProductsPopUp = ({ popUpProduct, setpopup }) => {
  const {
    productName,
    price,
    catagory,
    description,
    shortDescription,
    productImage,
  } = popUpProduct;
  const defaultSize = { S: "", L: "", XL: "", XXL: "", XXXL: "" };
  const [size, setSize] = useState(defaultSize);
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    addItemToCart(popUpProduct);
  };
  const handleSize = (tsize) => {
    setSize(tsize);
  };

  const handlePopUp = () => {
    setpopup((prev) => {
      !prev;
    });
  };

  return (
    <div className="absolute top-0 h-screen bg-black bg-opacity-60 w-full text-xl ">
      <div className="relative bg-white max-w-[1200px] mx-auto mt-10  rounded-xl">
        <MdCancel
          onClick={handlePopUp}
          className="absolute top-2 right-5 text-3xl z-40"
        />
        <div className="flex gap-x-4">
          <img
            src={productImage}
            className="object-cover w-2/5 overflow-hidden"
          />
          <div className="flex flex-col gap-2">
            <span className="text-black text-2xl font-bold">{productName}</span>
            <div className="flex gap-x-2 ">
              Catgory:
              <span className=" w-fit text-black font-semibold bg-gray-200 rounded-xl px-2">
                {catagory}
              </span>
            </div>
            <span className="text-black text-2xl font-bold">{price}$</span>
            <span className="mt-1">Select Size</span>
            <div className="flex mt-1">
              <span
                className="border-2 border-gray-400 ml-1 p-3 "
                onClick={() => handleSize("L")}
              >
                S
              </span>
              <span className="border-2 border-gray-400 ml-1 p-3">L</span>
              <span className="border-2 border-gray-400 ml-1 p-3">XL</span>
              <span className="border-2 border-gray-400 ml-1 p-3">XXL</span>
              <span className="border-2 border-gray-400 ml-1 p-3">XXXL</span>
            </div>
            <button
              className="btn-large btn-outline-hover w-64 my-3 "
              onClick={addProductToCart}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 p-1 w-3/5 text-secondaryDark">
          <h2 className="text-2xl font-bold text-black my-3">
            Products Detail
          </h2>
          <div className="flex md:gap-32 gap-16">
            <h2 className="">
              Product Name:
              <span className="text-black font-semibold">{productName}</span>
            </h2>
            <p>
              Price:
              <span className="text-black font-semibold  w-fit bg-gray-200 rounded-xl px-3 ml-1">
                {price}
              </span>{" "}
              birr
            </p>
          </div>

          <div className="flex gap-x-2 ">
            Catgory:
            <span className=" w-fit text-black font-semibold bg-gray-200 rounded-xl px-2">
              {catagory}
            </span>
          </div>
          <p>
            Short Description:
            <span className="text-black font-semibold">{shortDescription}</span>
          </p>
          <p>
            Description:
            <span className="text-black font-semibold">{description}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowProductsPopUp;
