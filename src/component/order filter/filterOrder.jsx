import React, { Fragment, useContext, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { GiHoodie } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";
import { ProductsContext } from "../context/product.context";
const FilterOrder = ({
  products,
  setShopProducts,
  sideNavShow,
  setSideNavbarShow,
  changeToPreviousProducts,
  setPreviousProducts,
}) => {
  //const { products, setProduct } = useContext(ProductsContext);
  const [tshirtFilter, settshirtfilter] = useState(false);
  const handleclick = (catagory) => {
    const tshirtproducts = products.filter(
      (productitem) => productitem.catagory == catagory
    );

    setShopProducts(tshirtproducts);
    settshirtfilter(() => !tshirtFilter);
  };

  return (
    <div className="text-lg ">
      <div className="flex justify-between">
        <h2 className="font-bold">Filter</h2>{" "}
        <div>
          <BiFilterAlt className="text-3xl" />
        </div>
      </div>

      <div className="flex mt-2 justify-between relative">
        <h3>Catagories </h3>
        <span
          className="self-end"
          onClick={() => {
            setSideNavbarShow(!sideNavShow);
          }}
        >
          {tshirtFilter && (
            <AiFillCloseCircle
              className="absolute -top-9 rounded-full right-5 z-0 p-2 bg-yellow"
              onClick={setPreviousProducts(!changeToPreviousProducts)}
            />
          )}
          <IoIosArrowDown
            className={`text-3xl ${sideNavShow && "rotate-180"}`}
          />
        </span>
      </div>
      {sideNavShow && (
        <div className="flex flex-col ml-2">
          <div
            onClick={() => {
              handleclick("t-shirt");
            }}
            className="flex items-center  gap-x-3 hover:bg-gray-200 p-2"
          >
            <span>
              <FaTshirt />
            </span>{" "}
            T-shirt
          </div>

          <div
            className="flex items-center gap-x-3 hover:bg-gray-200 p-2"
            onClick={() => {
              handleclick("hoodie");
            }}
          >
            <span>
              <GiHoodie />
            </span>
            Hoodie
          </div>
          <div
            className="flex items-center gap-x-3 hover:bg-gray-100 p-2"
            onClick={() => {
              handleclick("scarf");
            }}
          >
            <span>
              <GiHoodie />
            </span>
            Scarf
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOrder;
