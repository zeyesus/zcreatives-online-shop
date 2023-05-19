import React from "react";
import AddProductForm from "../../component/admin-form/add-product.component";
import { Link, Outlet } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { HiClipboardList } from "react-icons/hi";
const AdminProducts = () => {
  return (
    <div className="grid sm:grid-cols-5  ">
      <div className="bg-slate-600 flex flex-col bg-white ">
        <Link
          to="/dashboard/adminproduct/products"
          className="flex justify-between items-center p-2  border-b-2 hover:border-brightYellow hover:bg-slate-100"
        >
          Products <HiClipboardList className="text-brightYellow h-6 w-6" />
        </Link>
        <Link
          to="/dashboard/adminproduct/addproducts"
          className="flex justify-between items-center p-2  border-b-2  hover:border-brightYellow hover:bg-slate-100"
        >
          Add products <AiFillFileAdd className="text-brightYellow h-6 w-6 " />
        </Link>
      </div>
      <div className=" sm:col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminProducts;
