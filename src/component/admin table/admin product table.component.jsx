import React, { Fragment, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../component/context/product.context";
import { DeletItem, GetItems } from "../../utils/firebase/firebase.utils";
import { collection } from "firebase/firestore";
import UpdateProductForm from "../admin-form/update-products.form.component";

const AdminProductsTable = () => {
  // const { products, setProduct, loading } = useContext(ProductsContext);
  const { loading } = useContext(ProductsContext);
  const [productsItems, setProductsItem] = useState([]);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      const usersFromDb = await GetItems("products");
      setProductsItem(usersFromDb);
    };
    getProducts();
  }, [toggleUpdateForm]);

  const hanldeClick = async (productId, collectionName) => {
    await DeletItem(productId, collectionName);
    setProductsItem(productsItems.filter((pitem) => pitem.id !== productId));
  };

  return (
    <Fragment>
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
              {productsItems.map((product) => {
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
                      <button
                        className="btn-small btn-hover bg-black"
                        onClick={() => {
                          setToggleUpdateForm((prev) => !prev);
                          setCurrentUpdatedProduct(product);
                        }}
                      >
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
      {toggleUpdateForm && (
        <UpdateProductForm
          closePopup={() => setToggleUpdateForm((prev) => !prev)}
          currentupdatedProduct={currentUpdatedProduct}
        />
      )}
    </Fragment>
  );
};

export default AdminProductsTable;
