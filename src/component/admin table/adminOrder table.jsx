import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  DeletItem,
  GetItems,
  UpdateEntry,
} from "../../utils/firebase/firebase.utils";
import UpdateUserForm from "../admin-form/update-user.component";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { UserContext } from "../context/user.context";
const AdminOrderTabel = () => {
  const [orders, setOrders] = useState([]);
  const [currentupdateduser, setcurrentupdateduser] = useState({});
  const [toogleupdateform, setupdateform] = useState(false);
  const { roles } = useContext(UserContext);
  useEffect(() => {
    const getOrders = async () => {
      const productsFromdb = await GetItems("orders");

      setOrders(productsFromdb);
    };
    getOrders();
  }, []);

  const hanldeClick = async (productId, collectionName) => {
    await DeletItem(productId, collectionName);
    setOrders(orders.filter((item) => item.id !== productId));
  };

  const handleApprove = async (productId, collectonName) => {
    try {
      await UpdateEntry(productId, collectonName);
    } catch (error) {
      console.error("error in updating", error);
    }
    // alert("updated successfuly");
  };
  return (
    <Fragment>
      <div className="relative">
        <div className="w-4/5 mx-auto">
          <table className="w-full text-left mt-4">
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
              {orders.map((orderItem) => {
                //console.log(orderItem.order, "///////order item");
                const orderDate = orderItem.timestamp.toDate().getDate();
                const orderMonth = orderItem.timestamp.toDate().getMonth() + 1;

                const currentDate = new Date().getDate();
                const currentMonth = new Date().getMonth() + 1;

                /* {
                    if (currentMonth == orderMonth) {
                      if (currentDate == orderDate) {
                        return <span>{10 - (currentDate - orderDate)}</span>;
                      } else if (
                        currentDate - orderDate <= 10 &&
                        currentDate - orderDate > 0
                      ) {
                        return (
                          <span>
                            {10 - (currentDate - orderDate)} days left
                          </span>
                        );
                      } else if (currentDate - orderDate > 10) {
                        return (
                          <span>
                            Order has passed {currentDate - orderDate - 10}...
                          </span>
                        );
                      }
                    } else if (currentMonth > orderMonth) {
                      return (
                        <span>
                          order has been Placed {currentMonth - orderMonth}{" "}
                          Month ago
                        </span>
                      );
                    }
                  } */

                return (
                  <tr key={orderItem.id} className="border-b-2 border-gray-400">
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
                            {orderItem.user.tid}
                          </span>
                        </p>
                      </div>
                    </td>

                    <td>{orderItem.id}</td>
                    <td className="text-white">
                      {orderItem.pending ? (
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
                      {orderItem.pending ? (
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
                      <button
                        className="btn bg-green-500 text-white py-2  font-semibold text-lg disabled:bg-gray-300 disabled:text-gray-400"
                        onClick={() => handleApprove(orderItem.id, "orders")}
                        disabled={
                          orderItem.pending == true || roles === "admin"
                        }
                      >
                        <span className="flex items-center gap-2 ">
                          {orderItem.pending ? "Approved" : "Approve"}{" "}
                          <FcApproval size={25} color="white" />
                        </span>
                      </button>
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
