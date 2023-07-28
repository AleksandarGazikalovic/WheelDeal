import React from "react";
import { Partners, Navbar, ElementSkeleton, Header } from "../components";

const Home = () => {
  return (
    <div className="gradient_bg">
      <Navbar />
      <Header />
      <Partners />
    </div>
  );
};

export default Home;
