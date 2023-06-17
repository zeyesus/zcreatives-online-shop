import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  DeletItem,
  GetItems,
  UpdateDisapprovalEntry,
  UpdateEntry,
} from "../../utils/firebase/firebase.utils";
import UpdateUserForm from "../admin-form/update-user.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcApproval, FcCancel } from "react-icons/fc";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";
import sendEmail from "../../utils/firebase/emailsender";
const AdminOrderTabel = () => {
  const [orders, setOrders] = useState([]);
  const [currentupdateduser, setcurrentupdateduser] = useState({});
  const [toogleupdateform, setupdateform] = useState(false);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const { roles } = useContext(UserContext);
  useEffect(() => {
    const getOrders = async () => {
      const productsFromdb = await GetItems("orders");

      setOrders(productsFromdb);
      setDisplayedOrders(productsFromdb);
    };
    getOrders();
  }, []);

  const hanldeClick = async (productId, collectionName) => {
    await DeletItem(productId, collectionName);
    const filterdeleted = orders.filter((item) => item.id !== productId);
    setOrders(filterdeleted);
    setDisplayedOrders(filterdeleted);
    toast.success("deleted successfully");
  };

  const handleApprove = async (productId, collectonName, userEmail) => {
    try {
      await UpdateEntry(productId, collectonName);
      await sendEmail(userEmail);
      const updatedOrders = orders.map((order) => {
        if (order.id === productId) {
          // Update the pending status of the order
          return { ...order, pending: false };
        }
        return order;
      });
      setDisplayedOrders(updatedOrders);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("error in updating", error);
    }
    // alert("updated successfuly");
  };
  const handleDisApprove = async (productId, collectonName) => {
    try {
      await UpdateDisapprovalEntry(productId, collectonName);
      const updatedOrders = orders.map((order) => {
        if (order.id === productId) {
          // Update the pending status of the order
          return { ...order, pending: true };
        }
        return order;
      });
      setDisplayedOrders(updatedOrders);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("error in updating", error);
    }
    // alert("updated successfuly");
  };
  const handlefilter = (status) => {
    const filterdOrders = orders.filter((order) => {
      return order.pending == status;
    });
    setDisplayedOrders(filterdOrders);
  };
  const handledefault = () => {
    setDisplayedOrders(orders);
  };

  const handlesearch = (event) => {
    const filterdOrders = orders.filter((order) => {
      return order.user.fname.toLowerCase().includes(event.target.value);
    });
    setDisplayedOrders(filterdOrders);
  };
  return (
    <Fragment>
      {/* /////////////////////////////////////////////////////  */}
      <div class="mt-6 md:flex md:items-center md:justify-between max-w-[1550px] mx-auto">
        <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button
            onClick={() => handledefault()}
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
          >
            View all
          </button>

          <button
            onClick={() => handlefilter(false)}
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            Done
          </button>

          <button
            onClick={() => handlefilter(true)}
            class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            Pending
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
            placeholder="Search with first name"
            class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handlesearch}
          />
        </div>
      </div>
      {/* 
      /////////////////////////////////// */}
      <div className="relative">
        <div className="w-4/5 mx-auto ">
          <table className="w-full text-left mt-4 shadow-xl shadow-gray-400 rounded-lg overflow-hidden">
            <thead className="bg-brightYellow ">
              <tr>
                <th className="p-2 font-bold ">Product Imagee</th>
                <th className="p-2 font-bold">Catagory</th>
                <th className="p-2 font-bold w-16">Order Id</th>
                <th className="p-2 font-bold ">Time Track</th>
                <th className="p-2 font-bold ">Status</th>
                <th className="p-2 font-bold ">Control</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((orderItem) => {
                //console.log(orderItem.order, "///////order item");
                const orderDate = orderItem.timestamp.toDate().getDate();
                const orderMonth = orderItem.timestamp.toDate().getMonth() + 1;

                const currentDate = new Date().getDate();
                const currentMonth = new Date().getMonth() + 1;

                return (
                  <tr
                    key={orderItem.id}
                    className="border-b-2 border-gray-400 hover:bg-gray-200"
                  >
                    <td>
                      {orderItem.order.map((item) => {
                        return (
                          <div className="flex gap-2">
                            <span>
                              <img className="w-28" src={item.productImage} />
                            </span>
                            <div className="flex flex-col text-gray-500  text-lg">
                              <p>
                                Catagory:
                                <span className="font-bold  w-fit bg-gray-200 rounded-xl px-2">
                                  {item.catagory}
                                </span>
                              </p>
                              <p>
                                Size:
                                <span className="font-bold  w-fit bg-gray-200 rounded-xl px-2">
                                  {item.size}
                                </span>
                              </p>
                              <p>
                                Quantity:
                                <span className="font-bold  w-fit bg-gray-200 rounded-xl px-2">
                                  {item.quantity}
                                </span>
                              </p>
                              <p>
                                Price:{" "}
                                <span className="font-bold  w-fit bg-gray-200 rounded-xl px-2">
                                  {item.price}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      <div className="flex flex-col text-gray-500  text-lg">
                        <p>
                          Full Name:
                          <span className="text-gray-900 font-bold">
                            {orderItem.user.fname} {orderItem.user.lname}
                          </span>
                        </p>
                        <p>
                          Location:
                          <span className="text-gray-900 font-bold">
                            {orderItem.user.location}
                          </span>
                        </p>
                        <p>
                          Transaction ID:
                          <span className="text-gray-900 font-bold">
                            {orderItem.user.email}
                          </span>
                        </p>
                      </div>
                    </td>

                    <td>{orderItem.id}</td>
                    <td className="text-white">
                      {!orderItem.pending ? (
                        <span className="bg-gray-300 text-gray-600 p-2 rounded-xl">
                          order has been done
                        </span>
                      ) : currentMonth == orderMonth ? (
                        currentDate == orderDate ? (
                          <span className="bg-yellow p-2 px-3 rounded-xl">
                            {10 - (currentDate - orderDate)} days to left
                          </span>
                        ) : currentDate - orderDate <= 10 &&
                          currentDate - orderDate > 0 ? (
                          <span className="bg-yellow p-2 px-3 rounded-xl">
                            {10 - (currentDate - orderDate)} days left
                          </span>
                        ) : currentDate - orderDate > 10 ? (
                          <span className="bg-red-400 p-2 px-3 rounded-xl">
                            Order has passed {currentDate - orderDate - 10}...
                          </span>
                        ) : null
                      ) : currentMonth > orderMonth ? (
                        <span className="bg-red-400 p-2 px-3 rounded-xl">
                          order has been Placed {currentMonth - orderMonth}{" "}
                          Month ago
                        </span>
                      ) : null}
                    </td>
                    <td>
                      {!orderItem.pending ? (
                        <span className="bg-green-500 p-2 px-4 font-semibold text-lg rounded-xl text-white">
                          Done
                        </span>
                      ) : (
                        <span className="bg-gray-200 p-2 px-4 font-semibold text-lg rounded-xl text-gray-500">
                          Pending...
                        </span>
                      )}
                    </td>
                    <td className=" ">
                      {orderItem.pending ? (
                        <button
                          className="btn bg-green-500 text-white py-2  font-semibold text-lg disabled:bg-gray-300 disabled:text-gray-400"
                          onClick={() => handleApprove(orderItem.id, "orders")}
                          //disabled={roles === "admin"}
                        >
                          <span className="flex items-center gap-2 ">
                            Approve
                            <FcApproval size={25} color="white" />
                          </span>
                        </button>
                      ) : (
                        <button
                          className="btn bg-red-500 text-white py-2  font-semibold text-lg disabled:bg-gray-300 disabled:text-gray-400"
                          onClick={() =>
                            handleDisApprove(
                              orderItem.id,
                              "orders",
                              orderItem.user.email
                            )
                          }
                          //disabled={roles === "admin"}
                        >
                          <span className="flex items-center gap-2 ">
                            Disapprove
                            <FcCancel size={25} color="white" />
                          </span>
                        </button>
                      )}
                      <button
                        className="btn py-2 ml-2 text-red-500 bg-black font-semibold text-lg"
                        onClick={() => hanldeClick(orderItem.id, "orders")}
                      >
                        <span className="flex items-center gap-2">
                          Delete <RiDeleteBin5Line size={25} />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {toogleupdateform && (
          <UpdateUserForm
            closePopup={() => setupdateform((prev) => !prev)}
            currentupdateduser={currentupdateduser}
          />
        )} */}
      </div>
    </Fragment>
  );
};

export default AdminOrderTabel;
