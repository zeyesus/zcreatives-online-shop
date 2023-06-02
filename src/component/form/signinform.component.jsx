import React, { Fragment, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../component/form/formInput.component";
import { GirlWithBgShape } from "../../assets";
import { toast } from "react-toastify";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  ////CONTEXT///////
  // const { setcurrentuser } = useContext(UserContext);
  const location = useLocation();
  const [formfield, setFormField] = useState(defaultForm);
  const { email, password } = formfield;
  const navigate = useNavigate();
  console.log(formfield);

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    location.pathname.startsWith("/cart") ? navigate("/cart") : navigate("/");
    ///////context/////
    // setcurrentuser(response);
    console.log(response);
    // const { user } = response;
    // const userDocRef = await createUserDocumentFromAuth(user);
    //console.log(userDocRef);
  };
  const resetFormFields = () => {
    setFormField(defaultForm);
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

    try {
      const user = await signInUserWithEmailAndPassword(email, password);
      /////USER CONTEXT////////
      // setcurrentuser(user);
      //console.log(user);
      toast.success("Successfuly Logged in");
      location.pathname.startsWith("/cart") ? navigate("/cart") : navigate("/");
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email");
          break;
        case "auth/wrong-password":
          toast.error("Wrong Email and Password Combination");
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
      <div className="md:flex gap-8">
        <div className="bg-black hidden md:block text-center w-2/4">
          <img src={GirlWithBgShape} className="h-3/4 mx-auto" />
          <h2 className="text-white font-semibold  text-4xl">Well come</h2>
        </div>
        <form onSubmit={handleSubmit} className="relative flex flex-col ">
          <h2 className="font-semibold text-2xl">Sign in</h2>
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
            Sign in
          </button>
          <button
            type="button"
            className="btn-outline-large btn_hover  mt-3 text-sm  mx-auto"
            onClick={signInWithGoogle}
          >
            Sign in with google
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignInForm;
