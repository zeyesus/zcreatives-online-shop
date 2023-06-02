import React, { useState } from "react";

const Dropdown = ({ children, dropDownName }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left z-20">
      <div>
        <button
          type="button"
          className="hidden md:inline-block  btn bg-yellow "
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {dropDownName}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0  w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
