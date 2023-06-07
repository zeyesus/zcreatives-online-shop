import React, { Fragment, useEffect, useState } from "react";
import { DeletItem, GetItems } from "../../utils/firebase/firebase.utils";
import UpdateUserForm from "../admin-form/update-user.component";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentupdateduser, setcurrentupdateduser] = useState({});
  const [toogleupdateform, settoogleupdateform] = useState(false);
  useEffect(() => {
    const getusers = async () => {
      const usersFromDb = await GetItems("users");
      setUsers(usersFromDb);
    };
    getusers();
  }, [toogleupdateform]);

  const hanldeClick = async (userId, collectionName) => {
    await DeletItem(userId, collectionName);
    setUsers(users.filter((item) => item.id !== userId));
  };
  return (
    <Fragment>
      <div className="relative">
        <div className="w-3/4 mx-auto">
          <div className="max-w-[1150px] mx-auto ">
            <h1 className="heading2 font-semibold">Users Tabel</h1>
          </div>
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
              {users.map((user) => {
                console.log(user.id, "////////from user tabel");
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
