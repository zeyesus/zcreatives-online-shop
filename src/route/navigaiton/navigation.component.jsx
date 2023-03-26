import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../component/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navbar = () => {
  const { currentuser, setcurrentuser } = useContext(UserContext);
  console.log(currentuser); ///log current user///
  const handleLogOut = async () => {
    await signOutUser();
    setcurrentuser(null);
    console.log(currentuser);
    console.log("successfuly loged out");
  };
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
            {currentuser ? (
              <span
                className="hidden md:inline-block  btn  btn_hover"
                onClick={handleLogOut}
              >
                Sign Out
              </span>
            ) : (
              <Fragment>
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
              </Fragment>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
