import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../component/context/product.context";
import { DeletItem } from "../../utils/firebase/firebase.utils";
import { collection } from "firebase/firestore";
const AdminProductsTable = () => {
  const { products, setProduct, loading } = useContext(ProductsContext);

  const hanldeClick = async (productId, collectionName) => {
    await DeletItem(productId, collectionName);
    // setProduct(
    //   products.filter((pitem) => {
    //     pitem.id !== productId;
    //   })
    // );
  };

  return (
    <div className="w-3/4 mx-auto h-screen">
      {loading ? (
        <h1 className="text-center text-brightYellow text-2xl mt-7">
          Loading....
        </h1>
      ) : (
        <table className="w-full text-left mt-4">
          <thead className="bg-brightYellow ">
            <tr>
              <th className="p-2 font-bold"> Product image</th>
              <th className="p-2 font-bold">Product Name</th>
              <th className="p-2 font-bold">Catagory</th>
              <th className="p-2 font-bold">Description</th>
              <th className="p-2 font-bold">Price</th>
              <th className="p-2 font-bold">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((product) => {
              return (
                <tr className="border-b-2 border-gray-200" key={product.id}>
                  <td className="p-2 ">
                    <img src={product.productImage} className="h-10" alt="" />
                  </td>
                  <td className="p-2 ">{product.productName}</td>
                  <td className="p-2 ">{product.catagory}</td>
                  <td className="p-2 ">{product.shortDescription}</td>

                  <td className="p-2 ">{product.price}</td>
                  <td className="p-2 flex gap-x-1 items-center">
                    <button className="btn-small btn-hover bg-black">
                      Edit
                    </button>
                    <button
                      className="btn-small bg-red-500"
                      onClick={() => {
                        hanldeClick(product.id, "products");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductsTable;
