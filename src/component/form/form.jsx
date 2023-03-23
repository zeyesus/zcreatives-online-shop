import React from "react";
import girl from "../../assets/girlwithbgshape.png";
const Form = () => {
  return (
    <div>
      <form className="relative flex flex-col max-w-xs p-4 py-8 bg-lightDark mx-auto mt-20 shadow-lg">
        <img src={girl} alt="" className=" absolute -top-20 left-24 h-28" />
        <label htmlFor="Fname">First Name</label>
        <input
          type="text"
          name="Fname"
          id="Fname"
          placeholder="first name"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />
        <label htmlFor="Lname" className="mt-5">
          Last Name
        </label>
        <input
          type="text"
          name="Lname"
          id="Lname"
          placeholder="last name"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />

        <label htmlFor="password" className="mt-5">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          required
          className="h-10 rounded-lg border-none focus:ring-2 focus:ring-yellow"
        />

        <div className="mt-4 flex items-center space-x-2">
          <div>
            <input
              type="checkbox"
              name="xl"
              id="xl"
              className="rounded-sm border-2 border-yellow text-yellow checked:ring-yellow"
            />
            <label htmlFor="xl" className="ml-1">
              XL
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="xl"
              id="xl"
              className="rounded-sm border-2 border-yellow text-yellow checked:ring-yellow"
            />
            <label htmlFor="xl" className="ml-1">
              XL
            </label>
          </div>
        </div>
        <select name="items" id="items" className="h-10 border-none rounded-md">
          <option value="tshirt">T-shirt</option>
          <option value="tshirt">T-shirt</option>
          <option value="tshirt">T-shirt</option>
        </select>
        <button
          type="submit"
          className="btn-large btn_hover bg-yellow mt-10 w-2/3 mx-auto"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Form;
