import React, { Fragment, useEffect, useState } from "react";
import { DeletItem, GetItems } from "../../utils/firebase/firebase.utils";
import UpdateUserForm from "../admin-form/update-user.component";
import { toast } from "react-toastify";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteingusers, setfilteringusers] = useState([]);
  const [currentupdateduser, setcurrentupdateduser] = useState({});
  const [toogleupdateform, settoogleupdateform] = useState(false);
  useEffect(() => {
    const getusers = async () => {
      const usersFromDb = await GetItems("users");
      setUsers(usersFromDb);
      setfilteringusers(usersFromDb);
    };
    getusers();
  }, [toogleupdateform]);

  const hanldeClick = async (userId, collectionName) => {
    await DeletItem(userId, collectionName);
    const deletfilterduser = users.filter((item) => item.id !== userId);
    setUsers(deletfilterduser);
    setfilteringusers(deletfilterduser);
    toast.success("User deleted Successfully");
  };
  const handlesearch = (event) => {
    const searchfilters = users.filter((user) =>
      user.displayName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setfilteringusers(searchfilters);
  };
  const handlefilterRole = (role) => {
    const fiterdroles = users.filter((user) => user.role == role);
    setfilteringusers(fiterdroles);
  };
  const handledefault = () => {
    setfilteringusers(users);
  };
  return (
    <Fragment>
      <div className="relative">
        <div className="w-3/4 mx-auto">
          <div className="max-w-[1150px] mx-auto ">
            <h1 className="heading2 font-semibold">Users Tabel</h1>
          </div>
          {/* /////////////////////////////// */}
          <div class="mt-6 md:flex md:items-center md:justify-between max-w-[1550px] mx-auto">
            <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <button
                onClick={() => handledefault()}
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
              >
                View all
              </button>

              <button
                onClick={() => handlefilterRole("user")}
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                User
              </button>

              <button
                onClick={() => handlefilterRole("printworker")}
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                Print Worker
              </button>
              <button
                onClick={() => handlefilterRole("designer")}
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                Designer
              </button>
              <button
                onClick={() => handlefilterRole("admin")}
                class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
              >
                Admin
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
                placeholder="Search with Display name"
                class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlesearch}
              />
            </div>
          </div>
          {/* ////////////////////////////////////////// */}
          <table className="w-full text-left mt-4">
            <thead className="bg-brightYellow ">
              <tr>
                <th className="p-2 font-bold">User name</th>
                <th className="p-2 font-bold">Email</th>
                <th className="p-2 font-bold">Role</th>
                <th className="p-2 font-bold w-28">Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteingusers.map((user) => {
                return (
                  <tr className="border-b-2 border-gray-200" key={user.id}>
                    <td className="p-2 ">{user.displayName}</td>
                    <td className="p-2 ">{user.email}</td>
                    <td className="p-2 ">{user.role}</td>
                    {/* <td className="p-2 ">{user.createdAt}</td> */}

                    <td className="p-2 flex gap-x-1 items-center">
                      <button
                        className="btn-small btn-hover bg-black"
                        onClick={() => {
                          setcurrentupdateduser(user);

                          settoogleupdateform((prev) => !prev);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-small bg-red-500"
                        onClick={() => {
                          hanldeClick(user.id, "users");
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
        </div>
        {toogleupdateform && (
          <UpdateUserForm
            toogleupdateform={toogleupdateform}
            settoogleupdateform={settoogleupdateform}
            currentupdateduser={currentupdateduser}
          />
        )}
      </div>
    </Fragment>
  );
};

export default AdminUsersTable;
