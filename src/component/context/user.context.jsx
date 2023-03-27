import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangeListiner,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentuser: null,
  setcurrentuser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState();
  const value = { currentuser, setcurrentuser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListiner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setcurrentuser(user);
      console.log(user, "new user");
    });
    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
