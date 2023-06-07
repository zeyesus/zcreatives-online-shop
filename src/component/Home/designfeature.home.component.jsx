import { useContext } from "react";
import girl from "../../assets/girl.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";

const DesignSection = () => {
  const { currentuser } = useContext(UserContext);
  return (
    <section className="bg-primaryDark mt-14 h-[410px]">
      <div className="flex justify-evenly items-center  h-80 container mx-auto">
        <div className="ml-14 mt-3">
          <h1 className="heading1 text-white">
            Design What You
            <br />
            Have in mind
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            With 3D design feature integrated in our website you can design
            <br /> what you have in mind by simply uploading your designs.
          </p>
          <div className="mt-10">
            <Link to="/design" className="btn-large btn_hover ">
              Design Now
            </Link>
          </div>
        </div>
        <div className=" hidden md:block ">
          <img src={girl} alt="" className="h-[500px]  " />
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
