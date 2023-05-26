import React from "react";

const AdminHome = () => {
  return (
    <div className="text-white text-xl grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-6 max-w-xs md:max-w-5xl  mx-auto mt-6">
      <div className="relative p-2 bg-black h-44 hover:scale-95 transition-all">
        {" "}
        <h2>Total Users</h2>
        <h2 className="absolute right-2 bottom-3">1000</h2>
      </div>
      <div className="relative p-2 bg-slate-500 h-44 hover:scale-95 transition-all">
        {" "}
        <h2>Total Orders</h2>
        <h2 className="absolute right-2 bottom-3">1000</h2>
      </div>
      <div
        onClick={() => navigate("/adminusers")}
        className="relative p-2 bg-neutral-700 h-44 hover:scale-95 transition-all"
      >
        {" "}
        <h2>Total Product</h2>
        <h2 className="absolute right-2 bottom-3">1000</h2>
      </div>
    </div>
  );
};

export default AdminHome;
