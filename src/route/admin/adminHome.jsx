import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../component/context/user.context";
import { db, getCollectionSize } from "../../utils/firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { BsArrowRightCircle } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdProductionQuantityLimits, MdWorkOutline } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaUsers, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const AdminHome = ({ user }) => {
  const { currentuser } = useContext(UserContext);
  const [usercollection, setusercollection] = useState();
  const [productsamount, setproductsamount] = useState();
  const [ordersamount, setordersamount] = useState();
  useEffect(() => {
    const getUsernumber = async () => {
      const users = await getDocs(collection(db, "users"));
      setusercollection(users.docs.length);
    };
    const getProductsnumber = async () => {
      const users = await getDocs(collection(db, "products"));
      setproductsamount(users.docs.length);
    };
    const getOrdernumber = async () => {
      const users = await getDocs(collection(db, "orders"));
      setordersamount(users.docs.length);
    };
    getUsernumber();
    getProductsnumber();
    getOrdernumber();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-20 lg:max-w-7xl lg:grid-cols-2 lg:px-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Wellcome To {user} Page
          </h2>
          <p className="mt-4 text-gray-500">
            You can mange users,products,orders here.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900 flex items-center gap-4">
                Order Managment <MdProductionQuantityLimits size={30} />
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                Designed by Good Goods, Inc.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900 flex items-center gap-4">
                Product Managment <AiOutlineUnorderedList size={30} />
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                Solid walnut base with rare earth magnets and powder coated
                steel card cover
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900 flex items-center gap-4">
                User Managment <FiUsers size={30} />
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                6.25&quot; x 3.55&quot; x 1.15&quot;
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900 flex items-center gap-4">
                Employee Managemnet <MdWorkOutline size={30} />
              </dt>
              <dd className="mt-2 text-sm text-gray-500">
                Strong employee mangment with creating updatin and loging users.
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 text-xl font-semibold">
          <div className="relative p-2 bg-brightYellow rounded-lg shadow-xl h-44 hover:scale-95 transition-all">
            {" "}
            <h2>Total Users</h2>
            <h2 className="absolute left-2 bottom-3  text-3xl">
              {usercollection}
            </h2>
            <FaUsers size={100} className="absolute right-12 -bottom-2" />
            <div className="absolute right-2 bottom-2 flex gap-x-2">
              <BsArrowRightCircle size={35} color="black" />
            </div>
          </div>
          <div className="relative p-2 bg-brightYellow rounded-lg shadow-xl h-44 hover:scale-95 transition-all">
            {" "}
            <h2>Total Orders</h2>
            <h2 className="absolute left-2 bottom-3  text-3xl">
              {ordersamount}
            </h2>
            <FaCartPlus size={80} className="absolute right-12 bottom-0" />
            <div className="absolute right-2 bottom-2 flex gap-x-2">
              <BsArrowRightCircle color="black" />
            </div>
          </div>
          <div className="relative p-2 bg-brightYellow col-span-2 rounded-lg shadow-xl h-44 hover:scale-95 transition-all">
            {" "}
            <h2>Total Products</h2>
            <h2 className="absolute left-2 bottom-3  text-3xl">
              {productsamount}
            </h2>
            <GiProgression size={160} className="absolute right-12 bottom-0" />
            <div className="absolute right-2 bottom-2 flex gap-x-2">
              {" "}
              <BsArrowRightCircle size={35} color="black" />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex h-screen">
    //   <h1>{user}</h1>
    //   <div className="text-white text-xl grid grid max-w-xs md:max-w-5xl mt-6">
    //     <div className="relative p-2 bg-black h-44 hover:scale-95 transition-all">
    //       {" "}
    //       <h2>Total Users</h2>
    //       <h2 className="absolute right-2 bottom-3">1000</h2>
    //     </div>
    //     <div className="relative p-2 bg-slate-500 h-44 hover:scale-95 transition-all">
    //       {" "}
    //       <h2>Total Orders</h2>
    //       <h2 className="absolute right-2 bottom-3">1000</h2>
    //     </div>
    //     <div
    //       onClick={() => navigate("/adminusers")}
    //       className="relative p-2 bg-neutral-700 h-44 hover:scale-95 transition-all"
    //     >
    //       {" "}
    //       <h2>Total Product</h2>
    //       <h2 className="absolute right-2 bottom-3">1000</h2>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AdminHome;
