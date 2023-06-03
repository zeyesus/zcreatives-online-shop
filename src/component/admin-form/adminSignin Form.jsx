import React, { Fragment, useState } from "react";

import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../component/form/formInput.component";
import { GirlWithBgShape } from "../../assets";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

const defaultForm = {
  email: "",
  password: "",
};

const AdminSignInForm = () => {
  ////CONTEXT///////
  // const { setcurrentuser } = useContext(UserContext);
  const location = useLocation();
  const [formfield, setFormField] = useState(defaultForm);
  const { email, password } = formfield;
  const navigate = useNavigate();
  console.log(formfield);

  const resetFormFields = () => {
    setFormField(defaultForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signInUserWithEmailAndPassword(email, password);
      /////USER CONTEXT////////
      // setcurrentuser(user);
      //console.log(user);
      toast.success("successfuly Logged in");
      navigate("/dashboard");
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No user found with this email");
          break;
        case "auth/wrong-password":
          alert("Wrong Email and Password Combination");
          break;
        default:
          console.log("error encounterd", error);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formfield, [name]: value });
  };

  return (
    <Fragment>
      <div className="relative md:flex gap-8">
        <div className="absolute right-4 top-4 text-3xl">
          <MdCancel onClick={() => navigate("/")} />
        </div>
        <div className="bg-black hidden md:block text-center w-2/4">
          <img src={GirlWithBgShape} className="h-3/4 mx-auto" />
          <h2 className="text-white font-semibold  text-4xl">
            Well come To Admin page
          </h2>
        </div>
        <form onSubmit={handleSubmit} className=" my-auto flex flex-col w-1/4 ">
          <h2 className="font-semibold text-2xl self-center">
            Sign In As Admin
          </h2>
          <FormInput
            label="Email"
            name="email"
            value={email}
            type="text"
            placeholder="email"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            value={password}
            type="text"
            placeholder="password"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn-large btn_hover bg-yellow mt-10 w-2/3 mx-auto"
          >
            Sign In As Admin
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default AdminSignInForm;
