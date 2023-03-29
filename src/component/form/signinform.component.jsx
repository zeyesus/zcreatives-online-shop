import React, { Fragment, useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../component/form/formInput.component";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  ////CONTEXT///////
  // const { setcurrentuser } = useContext(UserContext);

  const [formfield, setFormField] = useState(defaultForm);
  const { email, password } = formfield;

  console.log(formfield);

  const signInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    ///////context/////
    // setcurrentuser(response);
    //console.log(response);
    // const { user } = response;
    // const userDocRef = await createUserDocumentFromAuth(user);
    //console.log(userDocRef);
  };
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
      <form onSubmit={handleSubmit} className="relative flex flex-col ">
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
          className="btn-outline-large btn-hover  mt-3  mx-auto"
          onClick={signInWithGoogle}
        >
          Sign in with google
        </button>
      </form>
    </Fragment>
  );
};

export default SignInForm;
