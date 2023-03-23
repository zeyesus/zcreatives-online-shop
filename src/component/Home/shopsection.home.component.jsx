import React from "react";
import { Link } from "react-router-dom";
import Girlwithbg from "../../assets/girlwithbgshape.png";
const ShopSection = () => {
  return (
    <section>
      <section className=" mt-14 ">
        <div className="flex justify-around items-center h-80">
          <div className="hidden md:block">
            <img src={Girlwithbg} alt="" className="h-96" />
          </div>
          <div>
            <h1 className="heading1 ">
              Design What You
              <br />
              Have in mind
            </h1>
            <div className="mt-16">
              <Link to="/signin" className="btn-large btn_hover ">
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
