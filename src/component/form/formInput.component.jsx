import React, { Fragment } from "react";

const FormInput = ({ label, ...otherprops }) => {
  return (
    <div className="flex flex-col mt-3 gap-2">
      {label && <label>{label}</label>}

      <input
        {...otherprops}
        className=" h-10 border-0 rounded-lg focus:ring-2 focus:ring-yellow focus:shadow-md"
      />
    </div>
  );
};

export default FormInput;
