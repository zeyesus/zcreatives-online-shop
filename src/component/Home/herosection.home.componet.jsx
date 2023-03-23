import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="h-screen w-full hero-image flex items-center justify-center md:justify-start">
      <div className=" md:ml-20 text-center md:text-left">
        <h1 className="text-8xl font-normal ">Wear</h1>
        <h1 className="text-8xl font-normal">Quality</h1>
        <h1 className="text-9xl font-normal text-yellow">Print</h1>
        <div className="mt-9">
          <Link to="/signup">
            <button className="btn-large btn_hover mr-8">Sign Up</button>
          </Link>
          <Link to="/signin">
            <button className="btn-outline-large btn-outline-hover">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
