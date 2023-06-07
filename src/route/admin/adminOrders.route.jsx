import React from "react";
import AdminOrderTabel from "../../component/admin table/adminOrder table";

const AdminOrders = () => {
  return (
    <div>
      <div className="max-w-[1530px] mx-auto ">
        <h1 className="heading2 font-semibold">Orders Managemnet Tabel</h1>
      </div>

      <AdminOrderTabel />
    </div>
  );
};

export default AdminOrders;
