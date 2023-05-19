import React, { useState } from "react";
import { Fragment } from "react";
import FormInput from "../form/formInput.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const AddUserForm = () => {
  const defaultFormData = {
    displayName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  };

  const [formState, setFormState] = useState(defaultFormData);
  const { displayName, userEmail, password, confirmPassword } = formState;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        userEmail,
        password
      );
      //////////Context for email and password login///////////////
      // setcurrentuser(user);
      ///////////////LOG////////////
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      setFormState(defaultFormData);
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
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mb-8 shadow-lg p-6 mx-auto  rounded-lg  mt-5"
      >
        <h2 className="text-2xl uppercase text-center">Create user</h2>
        <FormInput
          label="Full name"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          type="text"
          placeholder="selam tesfaye"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <FormInput
          label="Email"
          name="userEmail"
          value={userEmail}
          onChange={handleChange}
          type="email"
          placeholder="email adress"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <FormInput
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
          placeholder="password"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <FormInput
          label="Confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="confirm password"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <button
          className="disabled:bg-gray-400  btn-large  btn_hover bg-yellow mt-8  "
          type="submit"
        >
          Create user
        </button>
      </form>
    </Fragment>
  );
};

export default AddUserForm;
