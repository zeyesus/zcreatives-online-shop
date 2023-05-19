import React from "react";
import { Link } from "react-router-dom";
import {
  MdHighQuality,
  MdDesignServices,
  MdVerifiedUser,
} from "react-icons/md";
const Services = () => {
  return (
    <div>
      {/* //////Services section//// */}
      <section className="container mt-16 ">
        <h1 className="flex justify-center font-semibold text-3xl text-yellow">
          Services We Provide
        </h1>
        <div className="md:flex lg:gap-10 gap-5 md:justify-between md:max-w-6xl md:flex-1 mx-auto mt-12 ">
          <div className="card  cardhover ">
            <MdHighQuality className="text-6xl text-brightYellow" />

            <h2 className="heading2 mt-3">Quality print</h2>
            <p className="text-secondaryDark">
              With our latest machines we provide you a high quality print
            </p>
          </div>

          <div className="card  cardhover ">
            <MdDesignServices className="text-6xl text-brightYellow" />

            <h2 className="heading2 mt-3">Powerfull Design </h2>
            <p className="text-secondaryDark">
              With our latest machines we provide you a high quality print
            </p>
          </div>
          <div className="card  cardhover ">
            <MdVerifiedUser className="text-6xl text-brightYellow" />

            <h2 className="heading2 mt-3">Trusted by 1k users</h2>
            <p className="text-secondaryDark">
              With our latest machines we provide you a high quality print
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <Link to="/signin" className="btn-large btn_hover ">
            Join for More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
