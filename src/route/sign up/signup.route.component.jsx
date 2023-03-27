import { async } from "@firebase/util";
import React, { StrictMode } from "react";

import SignUpForm from "../../component/form/signupform.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignUp = () => {
  const logGoogleUser = async () => {
    await signInWithGooglePopup();
    //console.log(response);
    // const { user } = response;
    // const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className=" max-w-xs p-4 py-8 bg-lightDark mx-auto mt-20 shadow-lg">
      <SignUpForm />

      <button
        className="btn-outline-large btn-hover ml-5 mt-3 flex"
        onClick={logGoogleUser}
      >
        Sign up with google
      </button>
    </div>
  );
};

export default SignUp;
