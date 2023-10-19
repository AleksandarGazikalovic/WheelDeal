import React from "react";
import {
  Partners,
  Navbar,
  ElementSkeleton,
  Header,
  MovingCar,
  Footer,
  Roadmap,
  HostVsGuest,
} from "../../components";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="wd--home-page--background"></div>
      <Header />
      <Roadmap />
      <HostVsGuest />
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
