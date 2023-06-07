import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangeListiner,
  createUserDocumentFromAuth,
  db,
  getSingleItem,
} from "../../utils/firebase/firebase.utils";
import "firebase/auth";
import { collection, doc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

export const UserContext = createContext({
  currentuser: null,
  setcurrentuser: () => null,
  roles: null,
  setUserRole: () => null,
  loading: false,
});

export const UserProvider = ({ children }) => {
  const [roles, setUserRole] = useState(null);
  const [currentuser, setcurrentuser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListiner(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);

        // const roleofuser = await getSingleItem("users", user.uid);

        // setUserRole(roleofuser);
      }
      //console.log(roles, "////////////////role data from useEffect");
      setcurrentuser(user);
    });
    return unsubscribe;
  }, []);
  const value = { currentuser, setcurrentuser, roles, setUserRole, loading };
  console.log(roles, "roles from context");
  console.log(currentuser, "new user from context");
  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
  );
};
