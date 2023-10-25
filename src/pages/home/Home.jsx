import React, { useLayoutEffect, useState } from "react";
import {
  Partners,
  Header,
  Footer,
  Roadmap,
  HostVsGuest,
} from "../../components";
import "./home.css";

const Home = () => {
  const [isEverythingRendered, setIsEverythingRendered] = useState(false);

  // Use useLayoutEffect to set the state variable when everything is rendered
  useLayoutEffect(() => {
    setIsEverythingRendered(true);
  }, []);
  return (
    <>
      {isEverythingRendered && (
        <div className="wd--home-page--background"></div>
      )}
      <Header />
      <Roadmap />
      <HostVsGuest />
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
