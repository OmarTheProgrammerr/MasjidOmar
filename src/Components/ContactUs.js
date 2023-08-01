import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = () => {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_81v2sbr",
        "template_kmmmyea",
        e.target,
        "gYX9isnWXQOYiELzC"
      )
      .then(
        (result) => {
          console.log(result.text);
          setForm({ ...emptyForm });
          alert(
            "Your submission has been successfully received! Expect a response from us within the next 24 hours."
          );
          console.log(form);
          setLoading(false);
        },
        (error) => {
          console.log("Form submission error", error.text);
          setLoading(false);
        }
      );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-intro">
        <h2>WE ARE HERE TO HELP YOU</h2>
        <p>
          We would be thrilled to connect with you and answer all of your
          questions. Feel free to reach out, as our dedicated team stands
          prepared to address any inquiries you may have.
        </p>
      </div>
      <div className="contact-sections">
        <div className="contact-info">
          <div className="info-item">
            <a
              href="mailto:neilodeh07@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="theText"
            >
              <span className="icons">
                <SiGmail />
              </span>
              {" neilodeh07@gmail.com"}
            </a>
          </div>
          <div className="info-item">
            <a
              href="tel:+15049124477"
              target="_blank"
              rel="noopener noreferrer"
              className="theText"
            >
              <span className="icons">
                <FaPhoneAlt />
              </span>{" "}
              +1 504-912-4477
            </a>
          </div>
          <div className="info-item">
            <a
              href="https://www.instagram.com/neilodeh/"
              target="_blank"
              rel="noopener noreferrer"
              className="theText"
            >
              <BsInstagram className="icons" />
            </a>
          </div>
        </div>
        <div className="separator"></div>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
