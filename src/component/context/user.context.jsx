import { createContext, useState } from "react";

export const UserContext = createContext({
  currentuser: null,
  setcurrentuser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState();
  const value = { currentuser, setcurrentuser };
  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
