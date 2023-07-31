// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-links">
          <Link to="/">Masjid Omar</Link>
        </h3>
        <ul className="footer-links">
          <li>
            <Link to="/ContactUs">Contact Us</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>{" "}
            {/* Update this line */}
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>{" "}
            {/* Update this line */}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
