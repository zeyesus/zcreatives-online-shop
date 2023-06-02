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
  const [productWithSize, setProductsWithSize] = useState(popUpProduct);
  const defaultSize = { size: "" };
  const [size, setSize] = useState(defaultSize);
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => {
    addItemToCart(productWithSize);
  };
  const handleSize = (event) => {
    // setSize({ ["size"]: event.target.value });
    setProductsWithSize((prev) => {
      return { ...prev, ["size"]: event.target.value };
    });
  };

  console.log(productWithSize.size);

  const handlePopUp = () => {
    setpopup((prev) => {
      !prev;
    });
  };

  return (
    <div className="absolute z-50 top-0 h-full bg-black bg-opacity-60 w-full text-xl ">
      <div className="sticky top-40  bg-white max-w-[1200px]  mx-auto mt-10  rounded-xl">
        <MdCancel
          onClick={handlePopUp}
          className="absolute top-2 right-5 text-3xl z-40"
        />
        <div className="flex md:flex-row flex-col gap-x-4">
          <img
            src={productImage}
            className="object-cover w-2/5 overflow-hidden "
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
            <form className="flex flex-wrap gap-1 mt-1">
              <input
                id="small"
                type="radio"
                name="size"
                value="S"
                className=" peer"
                required
                checked={size == "S"}
                onChange={handleSize}
              />
              <label
                htmlFor="small"
                className="border-2  border-gray-400 ml-1 p-3  hover:border-primaryDark"
              >
                S
              </label>
              <input
                id="large"
                type="radio"
                name="size"
                value="L"
                checked={size == "L"}
                onChange={handleSize}
              />
              <label
                htmlFor="large"
                className="border-2 border-gray-400 ml-1 p-3"
              >
                L
              </label>
              <input
                id="extralarge"
                type="radio"
                name="size"
                value="XL"
                checked={size == "XL"}
                onChange={handleSize}
              />
              <label
                htmlFor="extralarge"
                className="border-2 border-gray-400 ml-1 p-3"
              >
                XL
              </label>
              <input
                id="doubleextralarge"
                type="radio"
                name="size"
                value="XXL"
                checked={size == "XXL"}
                onChange={handleSize}
              />
              <label
                htmlFor="doubleextralarge"
                className="border-2 border-gray-400 ml-1 p-3"
              >
                XXL
              </label>
              <input
                id="tripleextralarge"
                type="radio"
                name="size"
                value="XXXL"
                checked={size == "XXXL"}
                onChange={handleSize}
              />
              <label
                htmlFor="tripleextralarge"
                className="border-2 border-gray-400 ml-1 p-3"
              >
                XXXL
              </label>
            </form>
            {productWithSize.size == undefined ? (
              <button>choose size firse</button>
            ) : (
              <button
                className="btn-large btn-outline-hover w-64 my-3 "
                onClick={addProductToCart}
              >
                Add to cart
              </button>
            )}
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
