import React, { Fragment, useContext, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
  db,
  getSingleItem,
} from "../../utils/firebase/firebase.utils";
import { collection, doc } from "firebase/firestore";
import FormInput from "../../component/form/formInput.component";
import { GirlWithBgShape } from "../../assets";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import { MdCancel } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  ////CONTEXT///////
  // const { setcurrentuser } = useContext(UserContext);
  const { roles, setUserRole, loading } = useContext(UserContext);

  //const[roleofuser,setroleof]=useState()
  const location = useLocation();
  const [formfield, setFormField] = useState(defaultForm);
  const { email, password } = formfield;
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userwithrole = await createUserDocumentFromAuth(user, {
      displayName: user.displayName,
      role,
    });

    navigate("/");

    console.log(user, "////////from signinwithgoogle from sign in route");
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
      const userCredential = await signInUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      // /////////////////////////////////////////////
      // if (!user.emailVerified) {
      //   toast.error("The email you enterd is not verified");
      //   return;
      // }
      ////////////////////////////////////
      const rolee = await getSingleItem("users", user.uid);

      setUserRole(rolee);

      console.log(rolee, "///rolee from sign in ******");
      if (rolee == "user") {
        navigate("/");
        //location.pathname.startsWith("/cart") ? navigate("/cart") : navigate("/");
      } else if (rolee == "admin") {
        navigate("/dashboard");
      } else if (rolee == "printworker") {
        navigate("/printworker");
      } else if (rolee == "designer") {
        navigate("/designer");
      }

      toast.success("Successfuly Logged in");

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email and password combination");
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
      <div className="relative md:flex gap-8">
        <div className="absolute right-4 top-4 text-3xl">
          <MdCancel onClick={() => navigate("/")} />
        </div>
        <div className="bg-black hidden md:block text-center w-2/4">
          <img src={GirlWithBgShape} className="h-3/4 mx-auto" />
          <h2 className="text-white font-semibold  text-4xl">
            Well come To Sign In Page
          </h2>
        </div>
        <form onSubmit={handleSubmit} className=" my-auto flex flex-col w-1/4 ">
          <h2 className="font-bold leading-9 text-2xl self-center">Sign In</h2>
          <FormInput
            label="Email"
            name="email"
            value={email}
            type="email"
            placeholder="email"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            value={password}
            type="password"
            placeholder="password"
            required
            className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn-large btn_hover bg-yellow mt-10 w-2/3 mx-auto"
          >
            Sign In
          </button>

          <button
            type="button"
            className="btn-outline-large btn-outline-hover w-2/3 mx-auto btn-hover mt-3 flex items-center justify-around"
            onClick={signInWithGoogle}
          >
            <span>Sign up with google</span> <FcGoogle size={25} />
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignInForm;
