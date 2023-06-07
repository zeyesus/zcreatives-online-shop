import React, { Fragment, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../component/context/user.context";
const ProtectedPrintWorkerRoute = ({ children }) => {
  const { currentuser, roles } = useContext(UserContext); //useAuth()
  return currentuser && roles == "printworker" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedPrintWorkerRoute;
