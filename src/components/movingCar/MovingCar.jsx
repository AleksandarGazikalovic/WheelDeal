// import React from "react";
// import "./movingCar.css";
// import wdCar from "../../assets/wdCar.png";
// import wdCar2 from "../../assets/wdCar2.png";
// import wheel from "../../assets/wheel.png";
// import { useEffect, useState, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import road from "../../assets/road.svg";
// import {
//   PiNumberCircleOneLight,
//   PiNumberCircleTwoLight,
//   PiNumberCircleThreeLight,
//   PiNumberCircleFourLight,
// } from "react-icons/pi";

// const MovingCar = () => {
//   const [scrollPercentage, setScrollPercentage] = useState(0);
//   const [isElementVisible, setIsElementVisible] = useState(false);
//   const carRef = useRef(null);
//   const { ref: textRef1, inView: inView1 } = useInView();
//   const { ref: textRef2, inView: inView2 } = useInView();
//   const { ref: textRef3, inView: inView3 } = useInView();
//   const { ref: textRef4, inView: inView4 } = useInView();

//   // Function to update the scroll percentage state based on the scroll position
//   const updateScrollPercentage = (pathEndY, carStartingY) => {
//     const totalScrollableDistance = pathEndY - carStartingY;
//     if (window.scrollY - carStartingY > 0) {
//       const currentScrollPercentage =
//         ((window.scrollY - carStartingY) / totalScrollableDistance) * 100;
//       setScrollPercentage(currentScrollPercentage);
//     }
//     console.log(window.scrollY - carStartingY);
//   };

//   // Calculate the total scrollable distance when the component mounts
//   useEffect(() => {
//     const carDiv = document.getElementById("car");
//     const carStartingY = carDiv.getBoundingClientRect().bottom;

//     const divPath = document.getElementById("path");
//     const pathEndY = divPath.getBoundingClientRect().bottom;
//     console.log(divPath.scrollY);
//     const pathHeight = divPath.offsetHeight;

//     updateScrollPercentage(pathEndY, carStartingY); // Initial call to set the initial scroll percentage

//     const handleScroll = () => {
//       const bottomViewportY = window.innerHeight + window.scrollY;
//       const scrolledDistance = carStartingY - bottomViewportY;

//       if (scrolledDistance <= 0) {
//         // You have reached the div
//         setIsElementVisible(true);
//       } else {
//         setIsElementVisible(false);
//         // Amount of scrolling needed to reach the div
//         console.log("Scroll remaining:", scrolledDistance);
//       }
//       updateScrollPercentage(pathEndY, carStartingY);
//     };

//     // Attach the event listener to update the scroll percentage on scroll
//     window.addEventListener("scroll", handleScroll);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Function to handle intersection changes
//   const handleIntersection = (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         setIsElementVisible(true);
//       } else {
//         setIsElementVisible(false);
//       }
//     });
//   };

//   // Set up the Intersection Observer when the component mounts
//   useEffect(() => {
//     const observer = new IntersectionObserver(handleIntersection, {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0,
//     });

//     if (carRef.current) {
//       observer.observe(carRef.current);
//     }

//     // Clean up the Intersection Observer on component unmount
//     return () => {
//       if (carRef.current) {
//         observer.unobserve(carRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="wd--moving-car-section section__padding">
//       <div
//         ref={carRef}
//         className="wd--car"
//         id="car"
//         style={{
//           offsetDistance: isElementVisible ? `${scrollPercentage}%` : "",
//         }}
//       >
//         <img src={wdCar} alt="" />
//       </div>
//       <div className="wd--moving-car-section--content" id="path">
//         <div className="wd--path" id="path-top-right">
//           <p ref={textRef1} className={`${inView1 ? "slide-right" : ""}`}>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse neque
//             voluptate nihil optio ipsam fugit accusamus fugiat repellat, error
//             quis, enim dignissimos sit rem laboriosam at explicabo earum iste
//             aspernatur.
//           </p>
//           <PiNumberCircleOneLight
//             className={`${inView1 ? "icon13 scale-up-center" : "icon13"}`}
//           ></PiNumberCircleOneLight>
//         </div>
//         <div className="wd--path" id="path-top-left">
//           <PiNumberCircleTwoLight
//             className={`${inView2 ? "icon24 scale-up-center" : "icon24"}`}
//           ></PiNumberCircleTwoLight>

//           <p ref={textRef2} className={`${inView2 ? "slide-left" : ""}`}>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse neque
//             voluptate nihil optio ipsam fugit accusamus fugiat repellat, error
//             quis, enim dignissimos sit rem laboriosam at explicabo earum iste
//             aspernatur.
//           </p>
//         </div>
//         <div className="wd--path" id="path-top-right">
//           <p ref={textRef3} className={`${inView3 ? "slide-right" : ""}`}>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse neque
//             voluptate nihil optio ipsam fugit accusamus fugiat repellat, error
//             quis, enim dignissimos sit rem laboriosam at explicabo earum iste
//             aspernatur.
//           </p>
//           <PiNumberCircleThreeLight
//             className={`${inView3 ? "icon13 scale-up-center" : "icon13"}`}
//           ></PiNumberCircleThreeLight>
//         </div>
//         <div className="wd--path" id="path-top-left">
//           <PiNumberCircleFourLight
//             className={`${inView4 ? "icon24 scale-up-center" : "icon24"}`}
//           ></PiNumberCircleFourLight>
//           <p ref={textRef4} className={`${inView4 ? "slide-left" : ""}`}>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse neque
//             voluptate nihil optio ipsam fugit accusamus fugiat repellat, error
//             quis, enim dignissimos sit rem laboriosam at explicabo earum iste
//             aspernatur.
//           </p>
//         </div>
//       </div>

//       <div className="wave">
//         <svg
//           data-name="Layer 1"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
//             className="shape-fill"
//           ></path>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default MovingCar;
