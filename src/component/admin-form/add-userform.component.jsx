import React, { useState } from "react";
import { Fragment } from "react";
import FormInput from "../form/formInput.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddUserForm = () => {
  const defaultFormData = {
    displayName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const [formState, setFormState] = useState(defaultFormData);
  const { displayName, userEmail, password, confirmPassword, role } = formState;
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
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

      await createUserDocumentFromAuth(user, { displayName, role });
      toast.success("Account Created successfuly");
      navigate("/dashboard/adminusers");
      setFormState(defaultFormData);
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        toast.error("The email you enterd is already taken");
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, one special character and at least 8 or more characters"
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, one special character and at least 8 or more characters"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <div className="flex flex-col mt-4 ">
          <label>Role</label>
          <select
            name="role"
            value={role}
            onChange={handleChange}
            required
            className=" h-10 rounded-lg mt-2 focus:ring-2  focus:ring-yellow"
          >
            <option value="">Please choose catagory</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="designer">Designer</option>
            <option value="printworker">Printworker</option>
          </select>
        </div>
        <button
          className="disabled:bg-gray-400  btn-large  btn_hover bg-yellow mt-8  "
          type="submit"
        >
          Create User
        </button>
      </form>
    </Fragment>
  );
};

export default AddUserForm;
