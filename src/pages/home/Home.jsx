import React, { useCallback, useRef, useState } from "react";
import {
  Partners,
  Header,
  Footer,
  Roadmap,
  HostVsGuest,
} from "../../components";
import "./home.css";

const Home = () => {
  const [showBackground, setShowBackground] = useState(false);

  const observer = useRef();

  const hostVsGuestRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <>
      {showBackground && <div className="wd--home-page--background"></div>}
      <Header />
      <Roadmap />
      <HostVsGuest ref={hostVsGuestRef} />
      <Partners />
      <Footer />
    </>
  );
};

export default Home;
