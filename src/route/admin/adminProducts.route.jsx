import React, { useContext } from "react";
import AddProductForm from "../../component/admin-form/add-product.component";
import { Link, Outlet } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { HiClipboardList } from "react-icons/hi";
import { UserContext } from "../../component/context/user.context";
const AdminProducts = () => {
  const { roles } = useContext(UserContext);
  return (
    <div className="grid sm:grid-cols-5  ">
      <div className="bg-slate-600 flex flex-col bg-white ">
        {roles == "admin" ? (
          <>
            <Link
              to="/dashboard/adminproduct"
              className="flex justify-between items-center p-2  border-b-2 hover:border-brightYellow hover:bg-slate-100"
            >
              Products <HiClipboardList className="text-brightYellow h-6 w-6" />
            </Link>
            <Link
              to="/dashboard/adminproduct/addproducts"
              className="flex justify-between items-center p-2  border-b-2  hover:border-brightYellow hover:bg-slate-100"
            >
              Add products{" "}
              <AiFillFileAdd className="text-brightYellow h-6 w-6 " />
            </Link>
          </>
        ) : roles == "designer" ? (
          <>
            <Link
              to="/designer/adminproduct"
              className="flex justify-between items-center p-2  border-b-2 hover:border-brightYellow hover:bg-slate-100"
            >
              Products <HiClipboardList className="text-brightYellow h-6 w-6" />
            </Link>
            <Link
              to="/designer/adminproduct/addproducts"
              className="flex justify-between items-center p-2  border-b-2  hover:border-brightYellow hover:bg-slate-100"
            >
              Add products{" "}
              <AiFillFileAdd className="text-brightYellow h-6 w-6 " />
            </Link>{" "}
          </>
        ) : null}
      </div>
      <div className=" sm:col-span-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminProducts;
