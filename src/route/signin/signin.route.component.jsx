import React, { Fragment, useState } from "react";
import SignInForm from "../../component/form/signinform.component";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
const SignIN = () => {
  return (
    <div className="bg-lightDark mx-auto ">
      <SignInForm />
    </div>
  );
};

export default SignIN;
