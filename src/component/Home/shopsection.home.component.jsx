import React from "react";
import { Link } from "react-router-dom";
import Girlwithbg from "../../assets/girlwithbgshape.png";
const ShopSection = () => {
  return (
    <section>
      <section className=" mt-14 ">
        <div className="flex justify-around items-center h-[300px] md:h-auto ">
          <div className="hidden md:block">
            <img src={Girlwithbg} alt="" className="h-[420px]" />
          </div>
          <div>
            <h1 className="heading1 ">
              Explore Trending Design
              <br />
              Made By Us
            </h1>
            <p className="mt-2 text-gray-400">
              Explore latest modern design made by our elite designers which are
              <br /> fresh looks comic and eyecaching.
            </p>
            <div className="mt-16">
              <Link to="/order" className="btn-large btn_hover ">
                Join for More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ShopSection;
