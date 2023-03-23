import React from "react";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div>
      {/* //////Services section//// */}
      <section className="container mt-16 ">
        <h1 className="flex justify-center font-semibold text-3xl text-yellow">
          Services We Provide
        </h1>
        <div className="md:flex gap-10 md:justify-between md:max-w-6xl md:flex-1 mx-auto mt-12 ">
          <div className="card  cardhover">
            <div>
              <div>imgw</div>
            </div>
            <div className="mt-4">
              <h2 className="heading2 mb-3">Quality print</h2>
              <p className="text-secondaryDark">
                With our latest machines we provide you a high quality print
              </p>
            </div>
          </div>
          <div className="card  cardhover">
            <div>
              <div>img</div>
            </div>
            <div className="mt-4">
              <h2 className="heading2 mb-3">Qualty print</h2>
              <p className="text-secondaryDark">
                With our latest machines we provide you a high quality print
              </p>
            </div>
          </div>
          <div className="card  cardhover ">
            <div>img</div>
            <div className="mt-4">
              <h2 className="heading2 mb-3">Quality print</h2>
              <p className="text-secondaryDark">
                With our latest machines we provide you a high quality print
              </p>
            </div>
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
