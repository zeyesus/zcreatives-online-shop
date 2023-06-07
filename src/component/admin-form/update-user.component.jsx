import React, { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../form/formInput.component";
import { MdCancel } from "react-icons/md";
import { UpdateItem } from "../../utils/firebase/firebase.utils";
import { toast } from "react-toastify";
const UpdateUserForm = ({
  settoogleupdateform,
  toogleupdateform,
  currentupdateduser,
}) => {
  const navigate = useNavigate();
  const {
    id: userId,
    displayName: username,
    email,
    role: userrole,
  } = currentupdateduser;
  const defaultFormData = {
    displayName: username,
    userEmail: email,
    password: "",
    confirmPassword: "",
    role: userrole,
  };

  const [formState, setFormState] = useState(defaultFormData);
  const { displayName, userEmail, password, confirmPassword, role } = formState;
  console.log(formState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = async (event) => {
    const createdAt = new Date();
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password do not match");
      return;
    }
    try {
      UpdateItem(userId, "users", {
        displayName: displayName,
        email: userEmail,
        createdAt: createdAt,
        role: role,
      });
      settoogleupdateform((prev) => !prev);
      //navigate("/dashboard/adminusers");
      setFormState(defaultFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="absolute top-0 left-1 w-full h-screen bg-gray-300 bg-opacity-75">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg bg-gray-100 mb-8 shadow-lg px-6 py-2 mx-auto mt-5 rounded-lg "
        >
          <MdCancel
            className="text-3xl ml-auto"
            onClick={() => settoogleupdateform((prev) => !prev)}
          />
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
            Update User
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdateUserForm;
