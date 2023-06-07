import React, { Fragment, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../component/context/user.context";
const ProtectedDesignerRoute = ({ children }) => {
  const { currentuser, roles } = useContext(UserContext); //useAuth()
  return currentuser && roles == "designer" ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedDesignerRoute;
