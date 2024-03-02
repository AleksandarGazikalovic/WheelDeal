import React, { useEffect } from "react";
import "./hostVsGuest.css";
import { useRef } from "react";
import { GiPayMoney, GiMoneyStack } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Ri24HoursLine } from "react-icons/ri";
import { BsFillCarFrontFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";

const HostVsGuest = () => {
  const animateRefs = useRef([]);

  useEffect(() => {
    // Create an IntersectionObserver for each animated element
    animateRefs.current.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        {
          threshold: 0.5, // You can adjust this threshold as needed
        }
      );

      observer.observe(el);
    });
  }, []);

  return (
    <div className="wd--host-vs-guest--wrapper">
      <div className="wd--host-vs-guest--container">
        <div className="wd--host-vs-guest--content">
          <div className="wd--host-vs-guest--content--part">
            <div
              className="wd--host-vs-guest--content--part-header"
              ref={(element) => (animateRefs.current[0] = element)}
            >
              <h1>Host</h1>
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[1] = element)}
            >
              <GiMoneyStack size={70} />
              <p>Earn money by sharing your vehicle</p>
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[2] = element)}
            >
              <GiPayMoney size={70} />
              <p>Pay off car service, insurance and registration expenses</p>
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[3] = element)}
            >
              <FaMoneyBillTrendUp size={70} />
              <p>Invest in a new car that will pay off after a few years</p>
            </div>
          </div>
          <div className="wd--host-vs-guest--content--part">
            <div
              className="wd--host-vs-guest--content--part-header"
              ref={(element) => (animateRefs.current[4] = element)}
            >
              <h1>Guest</h1>
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[5] = element)}
            >
              <p>
                Save up to 25% of your money compared to traditional rent-a-car
                service
              </p>
              <GiReceiveMoney size={70} />
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[6] = element)}
            >
              <p>
                Never think again if you can find a car with our service
                available 24/7
              </p>
              <Ri24HoursLine size={70} />
            </div>
            <div
              className="wd--host-vs-guest--content--part-body"
              ref={(element) => (animateRefs.current[7] = element)}
            >
              <p>
                With our wide range of vehicles we can always secure what you
                want
              </p>
              <BsFillCarFrontFill size={70} />
            </div>
          </div>
        </div>
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

export default HostVsGuest;
