import React, { Fragment, useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../component/context/product.context";
import { DeletItem, GetItems } from "../../utils/firebase/firebase.utils";
import { collection } from "firebase/firestore";
import UpdateProductForm from "../admin-form/update-products.form.component";
import { toast } from "react-toastify";

const AdminProductsTable = () => {
  // const { products, setProduct, loading } = useContext(ProductsContext);
  const { loading } = useContext(ProductsContext);
  const [productsItems, setProductsItem] = useState([]);
  const [filterproductsItems, setfilterProductsItem] = useState([]);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      const usersFromDb = await GetItems("products");
      setProductsItem(usersFromDb);
      setfilterProductsItem(usersFromDb);
    };
    getProducts();
  }, [toggleUpdateForm]);

  const hanldeClick = async (productId, collectionName) => {
    await DeletItem(productId, collectionName);
    const updatedProducts = filterproductsItems.filter(
      (pitem) => pitem.id !== productId
    );
    setfilterProductsItem(updatedProducts);
    setProductsItem(updatedProducts);
    toast.success("Product Deleted Successfully");
  };
  const handlefiltercatagory = (catagory) => {
    const filterdcatagory = productsItems.filter(
      (item) => item.catagory == catagory
    );
    setfilterProductsItem(filterdcatagory);
  };
  const handleFilterPrice = (price) => {
    switch (price) {
      case "lessthan":
        const filterlessthan = productsItems.filter((item) => item.price <= 25);
        setfilterProductsItem(filterlessthan);
        break;
      case "between":
        const filterbettween = productsItems.filter(
          (item) => item.price > 25 && item.price < 51
        );
        setfilterProductsItem(filterbettween);
        break;
      case "graterthan":
        const filtergraterthan = productsItems.filter(
          (item) => item.price > 50
        );
        setfilterProductsItem(filtergraterthan);
        break;
      default:
        toast.info("error in filtering");
        break;
    }
  };
  const handledefault = () => {
    setfilterProductsItem(productsItems);
  };
  const handlesearch = (event) => {
    const searchresults = productsItems.filter((item) =>
      item.productName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setfilterProductsItem(searchresults);
  };
  return (
    <Fragment>
      <div className="w-11/12 mx-auto h-screen">
        <div className=" ">
          <h1 className="heading2 font-semibold">Products Tabel</h1>
        </div>
        {/* //////////////////////// */}
        <div class="mt-6 md:flex md:items-center md:justify-between max-w-[1550px] mx-auto">
          <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => handledefault()}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            >
              View all
            </button>

            <button
              onClick={() => handlefiltercatagory("t-shirt")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              T-Shirt
            </button>

            <button
              onClick={() => handlefiltercatagory("hoodie")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              Hoddie
            </button>
            <button
              onClick={() => handlefiltercatagory("scarf")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              Scarf
            </button>
          </div>

          <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => handledefault()}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            >
              View all
            </button>
            <button
              onClick={() => handleFilterPrice("lessthan")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              25{"<"}$
            </button>

            <button
              onClick={() => handleFilterPrice("between")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              26-50 $
            </button>
            <button
              onClick={() => handleFilterPrice("graterthan")}
              class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
            >
              {">"}51$
            </button>
          </div>
          <div class="relative flex items-center mt-4 md:mt-0">
            <span class="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search with product name"
              class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handlesearch}
            />
          </div>
        </div>
        {/* /////////////////////////////// */}
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
              {filterproductsItems.map((product) => {
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
