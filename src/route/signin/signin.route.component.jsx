import React, { Fragment, useState } from "react";
import SignInForm from "../../component/form/signinform.component";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
const SignIN = () => {
  return (
    <div className=" max-w-xs p-4 py-8 bg-lightDark mx-auto mt-20 shadow-lg">
      <SignInForm />
    </div>
  );
};

export default SignIN;
