import { createContext, useState } from "react";

export const AdminUserContext = createContext({
  adminCurrentUser: null,
  setadminCurrentUser: () => {},
});

export const AdminUserContextProvider = ({ children }) => {
  const [adminCurrentUser, setadminCurrentUser] = useState(null);
  const value = { adminCurrentUser, setadminCurrentUser };
  return (
    <AdminUserContext.Provider value={value}>
      {children}
    </AdminUserContext.Provider>
  );
};
