import React from "react";

const Tab = ({ tab, handleClick }) => {
  return (
    <div key={tab.name} onClick={handleClick} className=" w-8 ">
      <img src={tab.icon} alt={tab.name} />
    </div>
  );
};

export default Tab;
