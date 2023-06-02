import React, { Fragment, useContext, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineShopping, AiOutlineUserDelete } from "react-icons/ai";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../component/context/user.context";
import { CartContext } from "../../component/context/cart.context";
import {
  DeletItem,
  deleteUserFromAuth,
  sendPasswordReset,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropDown from "../../component/Card-Dropdown/cart-drop.component";
import Footer from "../../component/footer/footer.component";
import Dropdown from "../../component/dropdown option/dropdownOptions.nav";

const Navbar = () => {
  const { currentuser } = useContext(UserContext);
  const [tooglenavbar, settoglenavbar] = useState(false);

  console.log(currentuser, "//////////from nav "); ///log current user///

  const handleLogOut = async () => {
    await signOutUser();
    // console.log(currentuser);
    console.log("successfuly loged out");
  };
  const handleUpdate = async () => {
    const { email } = currentuser;
    await sendPasswordReset(email);
  };
  ////////////CART CONTEXT//////
  const { isCartOpen } = useContext(CartContext);
  const handleUserAccountDelete = async () => {
    const { uid } = currentuser;
    await deleteUserFromAuth();
    await DeletItem(uid, "users");
    // console.log(currentuser);
    console.log("successfuly deleted an account out");
  };

  return (
    <Fragment>
      <div className="relative">
        <nav className="relative bg-primaryDark mx-auto p-2 text-white">
          <div className="flex  container mx-auto items-center justify-between px-6">
            <div className="">
              <img src="src\assets\nav logo.svg" className="w-24 " alt="" />
            </div>
            <div>
              <div className="hidden md:flex space-x-5 text-lg font-semibold">
                <Link to="/" className="hover:text-yellow">
                  Home
                </Link>
                <Link to="/order" className="hover:text-yellow">
                  Order
                </Link>
                <Link to="/design" className="hover:text-yellow">
                  Design
                </Link>
                <Link to="/cart" className="hover:text-yellow">
                  Cart
                </Link>
              </div>
            </div>
            <div className=" flex space-x-4 items-center">
              {currentuser ? (
                <div className="flex items-center gap-x-3">
                  <span
                    className="hidden md:inline-block  btn  btn_hover"
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </span>
                  <Dropdown
                    dropDownName={<RiUserSettingsFill className=" text-2xl" />}
                  >
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleUpdate}
                    >
                      <GrUpdate className="inline-block pr-1 text-xl" />{" "}
                      <span>Update Profile</span>
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                      onClick={handleUserAccountDelete}
                    >
                      <AiOutlineUserDelete className="inline-block pr-1 text-xl" />
                      <span>Delete Account</span>
                    </button>
                  </Dropdown>
                </div>
              ) : (
                <Fragment>
                  {/* <Link to="/signin">
                    <button className="hidden md:inline-block  btn  btn_hover">
                      Sign in
                    </button>
                  </Link> */}
                  <Dropdown dropDownName={"Sign In"}>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Sign in as user
                    </Link>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Sign in as Admin
                    </Link>
                  </Dropdown>
                  <Link to="/signup">
                    <button className="hidden md:inline-block  btn btn_hover">
                      Sign up
                    </button>
                  </Link>
                </Fragment>
              )}
              <CartIcon />
              <h1
                onClick={() => {
                  settoglenavbar(!tooglenavbar);
                }}
                className="md:hidden block"
              >
                <HiOutlineMenu size={30} />
              </h1>
            </div>
            {isCartOpen && <CartDropDown />}
          </div>
          {tooglenavbar && (
            <div className="absolute left-0  w-full flex flex-col items-center gap-y-3 text-white bg-black ">
              {" "}
              <Link
                to="/"
                className="border-b-0  hover:border-b-2 hover:border-yellow"
              >
                Home
              </Link>
              <Link
                to="/order"
                className="border-b-0  hover:border-b-2 hover:border-yellow"
              >
                Order
              </Link>
              <Link
                to="/design"
                className="border-b-0  hover:border-b-2 hover:border-yellow"
              >
                Design
              </Link>
              <Link
                to="/cart"
                className="border-b-0  hover:border-b-2 hover:border-yellow"
              >
                Cart
              </Link>
            </div>
          )}
        </nav>

        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Navbar;
