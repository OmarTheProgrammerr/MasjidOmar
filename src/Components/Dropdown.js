import "./Dropdown.css";
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { GiSpiralArrow as Arrow } from "react-icons/gi";
import { GiBasketballBasket as MAM } from "react-icons/gi";
import { PiMosqueLight } from "react-icons/pi";
import { Link } from "react-scroll";
import { IoIosArrowRoundBack as Back } from "react-icons/io";
import { BiSolidBasketball } from "react-icons/bi";

function Dropdown(props) {
  const Navbar = (props) => {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  };
  const NavItem = (props) => {
    const [open, setOpen] = useState(false);
    console.log("somthing happened!");

    return (
      <div className="nav-item">
        <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
          <PiMosqueLight size={50} />
        </a>

        {open &&
          React.cloneElement(props.children, {
            closeDropdown: () => setOpen(false),
          })}
      </div>
    );
  };

  function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
    }, []);

    function calcHeight(el) {
      const height = el.offsetHeight + 30;
      setMenuHeight(height);
    }
    function DropdownItem(props) {
      return (
        <a
          href="#HeyThere"
          className="menu-item"
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className="icon-button-inside">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }
    function DropdownItemForGetStarted(props) {
      return (
        <Link
          activeClass="active"
          to="body"
          className="menu-item"
          onClick={props.closeDropdown} // Add this line
        >
          <span className="icon-button-inside">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </Link>
      );
    }

    function DropdownItemForContactUs(props) {
      return (
        <a
          href="ContactUs"
          className="menu-item"
          onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
        >
          <span className="icon-button-inside">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
      );
    }

    return (
      <div
        className="dropdown"
        style={{ height: menuHeight }}
        ref={dropdownRef}
      >
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem leftIcon={<MAM />} goToMenu="GetStarted">
              Get Started / Contact ?
            </DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "GetStarted"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<Back />}>
              Back
            </DropdownItem>
            <DropdownItemForGetStarted
              goToMenu="body"
              leftIcon={<BiSolidBasketball />}
              closeDropdown={props.closeDropdown}
            >
              Get Started
            </DropdownItemForGetStarted>

            <DropdownItemForContactUs
              goToMenu="GetStarted"
              leftIcon={<Arrow />}
            >
              Contact Us
            </DropdownItemForContactUs>
          </div>
        </CSSTransition>
      </div>
    );
  }

  return (
    <div className="overlay">
      <Navbar>
        <NavItem>
          <DropdownMenu closeDropdown={props.closeDropdown}></DropdownMenu>
        </NavItem>
      </Navbar>
    </div>
  );
}

export default Dropdown;
