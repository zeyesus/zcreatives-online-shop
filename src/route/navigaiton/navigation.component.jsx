import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <Fragment>
      <nav className="relative bg-primaryDark mx-auto p-2 text-white">
        <div className="flex items-center justify-between px-6">
          <div className="">
            <img src="src\assets\nav logo.svg" className="w-24 " alt="" />
          </div>
          <div>
            <div className="hidden md:flex space-x-5">
              <Link to="/">Home</Link>
              <Link to="/order">Order</Link>
              <Link to="/design">Design</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
          <div className="space-x-4">
            <Link to="/signin">
              <button className="hidden md:inline-block  btn  btn_hover">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="hidden md:inline-block  btn btn_hover">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
