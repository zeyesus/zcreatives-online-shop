import React, { Fragment } from "react";

const FormInput = ({ label, ...otherprops }) => {
  return (
    <div className="flex flex-col mt-3 gap-2">
      {label && (
        <label className="text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}

      <input
        {...otherprops}
        className=" h-10 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 rounded-lg focus:ring-2 focus:ring-yellow focus:shadow-md"
      />
    </div>
  );
};

export default FormInput;
