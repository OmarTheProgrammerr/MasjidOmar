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

        <Link to="/ContactUs">Contact Us</Link>

        <p>&copy; 2023 All Rights Reserved</p>
        <p>
          Built, Designed and Developed By{" "}
          <a
            href="https://www.omar-fares.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Omar Fares
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
