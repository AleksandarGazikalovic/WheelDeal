import React from "react";
import {
  Partners,
  Navbar,
  ElementSkeleton,
  Header,
  MovingCar,
  Footer,
} from "../../components";

const Home = () => {
  return (
    <div className="gradient_bg">
      <Header />
      {/* <MovingCar /> */}
      <Partners />
      <Footer />
    </div>
  );
};

export default Home;
