import React from "react";
import girl from "../../assets/girl.svg";
import { Link } from "react-router-dom";
const DesignSection = () => {
  return (
    <section className="bg-primaryDark mt-14 ">
      <div className="flex justify-around items-center h-80">
        <div>
          <h1 className="heading1 text-white">
            Design What You
            <br />
            Have in mind
          </h1>
          <div className="mt-16">
            <Link to="/design" className="btn-large btn_hover ">
              Design Now
            </Link>
          </div>
        </div>
        <div className="self-end hidden md:block">
          <img src={girl} alt="" className="h-96" />
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
