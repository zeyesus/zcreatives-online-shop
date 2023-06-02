import React, { Fragment, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../component/context/user.context";
const ProtectedAdminRoute = ({ children }) => {
  const { currentuser } = useContext(UserContext); //useAuth()
  return currentuser ? children : <Navigate to="/adminsignin" />;
};

export default ProtectedAdminRoute;
