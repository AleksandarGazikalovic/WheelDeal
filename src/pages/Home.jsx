import React from "react";
import { Header } from "../containers";
import { Partners, Navbar } from "../components";

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
