import React from "react";
import "./footer.css";
import logo from "../../assets/Logo2.png";
import { BsInstagram, BsLinkedin, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="wd__footer">
      <div className="wd__footer-logo">
        <img
          src={logo} // Replace with your logo image path
          alt="Logo"
        />
      </div>
      <div className="wd__footer-content">
        <div className="wd__footer-content__left">
          <h2>Links of interest</h2>
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/FAQ">FAQ</a>
          <a href="/contact">Contact us</a>
        </div>
        <div className="wd__footer-content__center">
          <a href="/terms">Terms & Conditions</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/cookies">Cookies Policy</a>
          <a href="/compliance">Compliance</a>
        </div>
        <div className="wd__footer-content__right">
          <h2>Follow us</h2>
          <a
            href="www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram fontSize={30}> </BsInstagram>
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook fontSize={30}> </BsFacebook>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin fontSize={30}> </BsLinkedin>
          </a>
        </div>
      </div>
      <div className="wd__footer-rights">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
