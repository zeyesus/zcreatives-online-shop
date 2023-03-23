import { async } from "@firebase/util";
import React, { StrictMode } from "react";
import Form from "../../component/form/form";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignUp = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    //console.log(response);
    const { user } = response;
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      {/* <Form /> */}
      <button className="btn btn-hover" onClick={logGoogleUser}>
        Sign up with google
      </button>
    </div>
  );
};

export default SignUp;
