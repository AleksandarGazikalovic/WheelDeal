import React from "react";
import "./movingCar.css";
import wdCar from "../../assets/wdCar.png";
import wheel from "../../assets/wheel.png";
import { useEffect, useState, useRef } from "react";

const MovingCar = () => {
  // const [isVisible, setIsVisible] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const imageRef = useRef(null);
  // const animationRef = useRef(null);

  // const handleScroll = () => {
  //   if (!animationRef.current) {
  //     animationRef.current = requestAnimationFrame(() => {
  //       setScrollPosition(window.scrollY);
  //       animationRef.current = null;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5, // Adjust the threshold as needed (0 to 1)
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       } else {
  //         setIsVisible(false);
  //       }
  //     });
  //   }, options);

  //   if (imageRef.current) {
  //     observer.observe(imageRef.current);
  //   }

  //   return () => {
  //     if (imageRef.current) {
  //       observer.unobserve(imageRef.current);
  //     }
  //   };
  // }, [useRef]);

  return (
    <div className="wd--moving-car-section section__padding">
      <div className="wd--moving-car-section--content">
        <div
          // ref={imageRef}
          className="wd--car slide-right"
          // style={{
          //   transform: isVisible
          //     ? `translateY(${scrollPosition * 0.5}px)`
          //     : "none",
          //   transition: "transform 0.2s ease",
          // }}
        >
          <img src={wdCar} alt="" />
          <div className="wd--car-wheel">
            <div className="wd--car-wheel-left">
              <img src={wheel} alt="" />
            </div>
            <div className="wd--car-wheel-right">
              <img src={wheel} alt="" />
            </div>
          </div>
        </div>
        <div className="wd--path" id="path-top-right"></div>
        <div className="wd--path" id="path-top-left"></div>
        <div className="wd--path" id="path-top-right"></div>
        <div className="wd--path" id="path-top-left"></div>
        <div className="wd--path" id="path-top-right"></div>
      </div>

      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default MovingCar;
