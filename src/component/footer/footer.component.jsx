import React from "react";
import { Link } from "react-router-dom";
import "./footer.component.css";
import { zcreativeslogo } from "../../assets";
const Footer = () => {
  return (
    <section className="bg-primaryDark text-white ">
      <div className="h-60 flex flex-col md:flex-row md:justify-around md:items-center">
        <div className="">
          <img src={zcreativeslogo} className="h-10 -ml-2" />
          <div className=" flex  space-x-3 mt-5">
            <Link to="/" className="footer-link footer-link-hover">
              Home
            </Link>
            <Link to="/order" className="footer-link footer-link-hover">
              Order
            </Link>
            <Link to="/design" className="footer-link footer-link-hover">
              Design
            </Link>
            <Link to="/cart" className="footer-link footer-link-hover">
              Cart
            </Link>
          </div>
        </div>
        <div className="w-80">
          <p className="text-lightDark mt-10 md:mt-0 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis
            aperiam excepturi minima sapiente, quidem perspiciatis totam.
            Expedita, incidunt inventore nisi voluptate alias earum non quam
            quas dolorem ex? Quia, nulla.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
