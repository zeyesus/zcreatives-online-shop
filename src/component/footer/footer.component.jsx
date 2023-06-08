import React from "react";
import { Link } from "react-router-dom";
import "./footer.component.css";
import { zcreativeslogo } from "../../assets";
const Footer = () => {
  const date = new Date();
  return (
    <section className="bg-primaryDark text-white ">
      <div className="h-60 flex flex-col pl-8 md:pl-0 md:flex-row md:justify-around md:items-center">
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
            Z- creatives is an emerging company formulated back in 2013. The
            company has been provideing its customers with t-shirt related
            products. Now it comes with new platform enjoy.
          </p>
        </div>
      </div>
      <p className="text-gray-400 text-left md:text-center">
        CopyRight reserved {date.getDate()}/{date.getUTCFullYear()}
      </p>
    </section>
  );
};

export default Footer;
