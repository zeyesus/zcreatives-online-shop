import React, { useContext } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { GiHoodie } from "react-icons/gi";
import { FaTshirt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ProductsContext } from "../context/product.context";
const FilterOrder = ({ products, setShopProducts }) => {
  //const { products, setProduct } = useContext(ProductsContext);

  const handleclick = (catagory) => {
    const tshirtproducts = products.filter(
      (productitem) => productitem.catagory == catagory
    );

    setShopProducts(tshirtproducts);
  };

  return (
    <div className="text-lg ">
      <div className="flex justify-between">
        <h2 className="font-bold">Filter</h2>{" "}
        <BiFilterAlt className="text-3xl" />
      </div>

      <div className="flex mt-2 justify-between">
        <h3>Catagories </h3>
        <span className="self-end">
          <IoIosArrowDown className="text-3xl" />
        </span>
      </div>
      <div className="flex flex-col ml-2">
        <div
          onClick={() => {
            handleclick("t-shirt");
          }}
          className="flex items-center gap-x-3 hover:bg-gray-200 p-2"
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
    </div>
  );
};

export default FilterOrder;
