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
    <>
      <Header />
      {/* <MovingCar /> */}
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
