import React from "react";
import {
  Partners,
  Navbar,
  ElementSkeleton,
  Header,
  MovingCar,
} from "../components";

const Home = () => {
  return (
    <div className="gradient_bg">
      <Navbar />
      <Header />
      <MovingCar />
      <Partners />
    </div>
  );
};

export default Home;
