import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import AddProductForm from "../../component/admin-form/add-product.component";
import { RiAdminFill } from "react-icons/ri";
const AdminNav = () => {
  return (
    // <Fragment>
    //   <h2>admin nav</h2>
    //   <AddProductForm />
    // </Fragment>

    <Fragment>
      <nav className="relative bg-primaryDark mx-auto p-2 text-white">
        <div className="flex items-center justify-between px-6">
          <div className=" flex gap-2">
            {/* <img
              src="zcreatives final project\src\assets\zcreatives.png"
              className="w-24 "
              alt=""
            /> */}
            <RiAdminFill className="text-white h-6 w-6" />
            Admin dashboard
          </div>
          <div>
            <div className="hidden md:flex space-x-5">
              <Link to="/dashboard">Admin Home</Link>
              <Link to="/dashboard/adminorderpage">Orders</Link>
              <Link to="/dashboard/adminusers">Users</Link>
              <Link to="/dashboard/adminproduct">Product</Link>
            </div>
          </div>
          <div className=" flex space-x-4">
            {/* <span
                className="hidden md:inline-block  btn  btn_hover"
                onClick={handleLogOut}
              >
                Sign Out
              </span> */}

            <Fragment>
              <Link to="/adminsignin">
                <button className="hidden md:inline-block  btn  btn_hover">
                  Sign in
                </button>
              </Link>
            </Fragment>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default AdminNav;
