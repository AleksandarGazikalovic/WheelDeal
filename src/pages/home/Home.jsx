import React from "react";
import {
  Partners,
  Navbar,
  ElementSkeleton,
  Header,
  MovingCar,
  Footer,
  Roadmap,
} from "../../components";

const Home = () => {
  return (
    <>
      <Header />
      {/* <MovingCar /> */}
      <Roadmap />
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
