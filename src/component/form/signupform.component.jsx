import React, { Fragment, useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import girl from "../../assets/girlwithbgshape.png";
import FormInput from "./formInput.component";
import { UserContext } from "../context/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmpassword: "",
};
const SignUpForm = () => {
  const { setcurrentuser } = useContext(UserContext); ////context////

  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmpassword } = formFields;

  console.log(formFields);

  const reserFormfields = () => {
    setformFields(defaultFormFields);
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setformFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //////////Context for email and password login///////////////
      setcurrentuser(user);
      ///////////////LOG////////////
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      reserFormfields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("The email you enterd is already taken");
      } else {
        console.log("user created encpunterd an error:", error);
      }
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="relative flex flex-col ">
        <img src={girl} alt="" className=" absolute -top-20 left-24 h-28" />

        <FormInput
          label="Display Name"
          name="displayName"
          value={displayName}
          type="text"
          placeholder="display name"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Email"
          name="email"
          value={email}
          type="email"
          placeholder="email"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          type="text"
          placeholder="password"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Confirm password"
          name="confirmpassword"
          value={confirmpassword}
          type="text"
          placeholder="confirm password"
          required
          onChange={changeHandler}
        />

        <button
          type="submit"
          className="btn-large btn_hover bg-yellow mt-10 w-2/3 mx-auto"
        >
          Sign Up
        </button>
      </form>
    </Fragment>
  );
};

export default SignUpForm;
