import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { HiClipboardList } from "react-icons/hi";
const AdminDashboard = () => {
  return (
    <div className="grid sm:grid-cols-5  ">
      <div className="flex flex-col bg-white ">
        <Link
          to="/dashboard/adminusers/users"
          className="flex justify-between items-center p-2  border-b-2 hover:text-brightYellow hover:border-brightYellow hover:bg-slate-100"
        >
          Users <HiClipboardList className="text-brightYellow h-6 w-6" />
        </Link>
        <Link
          to="/dashboard/adminusers/adduser"
          className="flex justify-between items-center p-2  border-b-2 hover:text-brightYellow hover:border-brightYellow hover:bg-slate-100"
        >
          Add User <AiFillFileAdd className="text-brightYellow h-6 w-6 " />
        </Link>
      </div>
      <div className=" sm:col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
