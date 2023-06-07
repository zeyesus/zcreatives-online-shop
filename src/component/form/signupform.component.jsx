import React, { Fragment, useContext, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import girl from "../../assets/girlwithbgshape.png";
import FormInput from "./formInput.component";
import { GirlWithBgShape } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmpassword: "",
};
const roles = {
  user: "user",
  admin: "admin",
  printworker: "printworker",
  designer: "designer",
};
const SignUpForm = () => {
  // const { setcurrentuser } = useContext(UserContext); ////context////
  const navigate = useNavigate();
  const [formFields, setformFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmpassword } = formFields;
  const [role, setRole] = useState("user");
  const location = useLocation();
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
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("password do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      //////////Context for email and password login///////////////
      // setcurrentuser(user);

      const userwithrole = await createUserDocumentFromAuth(user, {
        displayName,
        role,
      });
      console.log(userwithrole, "///////user with role");
      toast.success("Account created successfuly");
      navigate("/");
      // location.pathname.startsWith("/cart") ? navigate("/cart") : navigate("/");
      reserFormfields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        toast.error("The email you enterd is already taken");
      } else if (error.code == "auth/invalid-email") {
        toast.error("Invalid email address");
      } else {
        console.log("user created encpunterd an error:", error);
      }
    }
  };

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
    location.pathname.startsWith("/cart") ? navigate("/cart") : navigate("/");
    //console.log(response);
    // const { user } = response;
    // const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="w-[1300px] mx-auto rounded-lg overflow-hidden shadow-xl shadow-gray-400">
      <div className="md:flex gap-8 ">
        <div className="bg-black hidden pb-4 w-3/5 md:block text-center ">
          <img src={GirlWithBgShape} className=" mx-auto" />
          <h2 className="text-white font-semibold  text-4xl">
            Create an account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col justify-center w-2/5 pr-10 "
        >
          <img src={girl} alt="" className=" absolute -top-0 left-44 h-28" />
          <h1 className="heading2 font-bold text-center">Sign Up</h1>
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
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, one special character and at least 8 or more characters"
            required
            onChange={changeHandler}
          />

          <FormInput
            label="Confirm password"
            name="confirmpassword"
            value={confirmpassword}
            type="text"
            placeholder="confirm password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, one special character and at least 8 or more characters"
            required
            onChange={changeHandler}
          />

          <button
            type="submit"
            className="btn-large btn_hover bg-yellow mt-10 w-2/3 mx-auto"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="btn-outline-large btn-outline-hover w-2/3 mx-auto btn-hover mt-3 flex items-center justify-around"
            onClick={logGoogleUser}
          >
            <span>Sign up with google</span> <FcGoogle size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
