import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Header.css";
import { RxDoubleArrowDown } from "react-icons/rx";
import { PiMosqueLight } from "react-icons/pi";
import { GoArrowUpLeft } from "react-icons/go";
import { GoBell } from "react-icons/go";
import { LiaDonateSolid } from "react-icons/lia";
import { Link } from "react-scroll";
import { PiQrCodeLight } from "react-icons/pi";

const Header = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [text, setText] = useState("");
  const message = "Compete, Score, Winnn!";
  const speed = 100; // time delay of print out
  const [getStartedColor, setGetStartedColor] = useState("white");
  const [contactUsColor, setContactUsColor] = useState("white");
  const [donationColor, setDonationColor] = useState("white");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (text.length < message.length) {
      setTimeout(() => {
        setText(message.substr(0, text.length + 1));
      }, speed);
    }
  }, [text]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="background">
      <header className="header">
        <div className="logoContainer">
          <PiMosqueLight size={30} className="logomos" />
          <div className="logo">Masjid Omar</div>
        </div>
        <nav>
          {windowWidth > 690 && (
            <>
              <Link
                activeClass="active"
                to="body"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="header-link"
                onMouseEnter={() => setGetStartedColor("black")}
                onMouseLeave={() => setGetStartedColor("white")}
              >
                <GoArrowUpLeft
                  size={25}
                  color={getStartedColor}
                  className="GSArrow"
                />
                Get Started
              </Link>
              <RouterLink
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="header-link"
                onMouseEnter={() => setContactUsColor("black")}
                onMouseLeave={() => setContactUsColor("white")}
                to="/ContactUs"
              >
                <GoBell
                  size={25}
                  color={contactUsColor}
                  className="ContactUsArrow"
                />
                Contact Us
              </RouterLink>
            </>
          )}
        </nav>
      </header>
      <div className="typing-text">
        <h1>{text}</h1>
      </div>
      <div
        className="arrow-animation"
        style={{ display: showArrow ? "block" : "none" }}
      >
        <RxDoubleArrowDown size={35} color="white" />
      </div>
    </div>
  );
};

export default Header;
