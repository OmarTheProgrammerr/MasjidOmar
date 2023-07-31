import React from "react";
import "./AboutUs.css";
import OrganizerPic from "../Imgs/OrganizerPic.jpeg";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="OrganizerPic">
        <img src={OrganizerPic} alt="Organizer" className="OrganizerPic2" />
      </div>
      <div className="separator"></div>
      <div className="about-us-text">
        <h2 className="about">About Us</h2>
        <p className="theText2">
          The Masjid Omar Basketball Tournament is organized by Neil, a
          passionate basketball enthusiast and community leader. He has years of
          experience in organizing sports events that bring people together.
          This platform is a part of his continuous efforts to foster a spirit
          of community and friendly competition through basketball. It is a
          streamlined tool to help participants easily register, create teams,
          and keep track of matches.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
