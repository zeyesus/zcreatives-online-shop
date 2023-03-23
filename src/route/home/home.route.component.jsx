import React, { Fragment } from "react";
import "./home.component.css";
import HeroSection from "../../component/Home/herosection.home.componet";
import Services from "../../component/Home/servicesection.home.component";
import DesignSection from "../../component/Home/designfeature.home.component";
import ShopSection from "../../component/Home/shopsection.home.component";
import Footer from "../../component/footer/footer.component";
const HomeRoute = () => {
  return (
    <Fragment>
      {/* hero section */}
      <HeroSection />
      <Services />
      <DesignSection />
      <ShopSection />
      <Footer />
    </Fragment>
  );
};

export default HomeRoute;
