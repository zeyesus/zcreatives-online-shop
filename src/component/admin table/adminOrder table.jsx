import React, { Fragment, useEffect, useState } from "react";
import { DeletItem, GetItems } from "../../utils/firebase/firebase.utils";
import UpdateUserForm from "../admin-form/update-user.component";

const AdminOrderTabel = () => {
  const [orders, setOrders] = useState([]);
  const [currentupdateduser, setcurrentupdateduser] = useState({});
  const [toogleupdateform, setupdateform] = useState(false);
  useEffect(() => {
    const getusers = async () => {
      const usersFromDb = await GetItems("orders");

      setOrders(usersFromDb);
    };
    getusers();
    console.log(orders, "//////////////order");
  }, []);

  const hanldeClick = async (userId, collectionName) => {
    await DeletItem(userId, collectionName);
    setOrders(users.filter((item) => item.id !== userId));
  };
  return (
    <Fragment>
      <div className="relative">
        <div className="w-3/4 mx-auto">
          <table className="w-full text-left mt-4">
            <thead className="bg-brightYellow ">
              <tr>
                <th className="p-2 font-bold">Product Imagee</th>
                <th className="p-2 font-bold">Catagory</th>
                <th className="p-2 font-bold w-28">Price</th>
                <th className="p-2 font-bold w-28">Size</th>
                <th className="p-2 font-bold w-28">Quantity</th>
              </tr>
            </thead>
            {orders.map((orderItem) => {
              console.log(orderItem.order, "///////order item");
              return (
                <tr className="border-b-2 border-gray-400">
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
                        <span>
                          {orderItem.user.fname} {orderItem.user.lname}
                        </span>
                      </p>
                      <p>
                        Location:
                        <span>{orderItem.user.location}</span>
                      </p>
                      <p>
                        Transaction ID:
                        <span>{orderItem.user.tid}</span>
                      </p>
                    </div>
                  </td>
                  <td>{orderItem.id}</td>
                  <td>
                    <button className="btn btn-large">Approved</button>
                  </td>
                </tr>
              );
            })}
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
