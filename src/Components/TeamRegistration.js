import React, { useState } from "react";
import { PiMosqueLight } from "react-icons/pi";
import "./TeamRegistration.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const TeamRegistration = () => {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState(Array(7).fill(""));
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleInputChange = (index, event) => {
    setPlayers(
      players.map((player, i) => (i === index ? event.target.value : player))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToRules) {
      alert("Please agree to the rules before submitting.");
      return;
    }

    fetch("https://masjid-omar-0397ffba6079.herokuapp.com/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamName, players: players.filter(Boolean) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    setTeamName("");
    setPlayers(Array(7).fill(""));
    setAgreedToRules(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsFading(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div>
      <div className="logo2">
        <RouterLink to="/">
          <div className="logoContainer">
            <PiMosqueLight size={30} className="logomos" />
            <div className="logo">Masjid Omar</div>
          </div>
        </RouterLink>
      </div>
      <div className="team-registration">
        <h2>Team Registration</h2>
        <form onSubmit={handleSubmit}>
          <label className="large-label">
            <div className="inputt">Team Name:</div>
            <input
              type="text"
              className="inputt"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </label>
          {players.map((player, index) => (
            <label key={index} className="large-label">
              Player {index + 1}:
              <input
                type="text"
                value={player}
                onChange={(e) => handleInputChange(index, e)}
                required={index < 4}
              />
            </label>
          ))}
          <label className="checkbox-label">
            I agree to the rules and conditions
            <input
              type="checkbox"
              className="checkbox"
              checked={agreedToRules}
              onChange={(e) => setAgreedToRules(e.target.checked)}
            />
          </label>

          <button className="submitbutton" type="submit">
            Register Team
          </button>
          {isSubmitted && (
            <div className={`success-message ${isFading ? "fade-out" : ""}`}>
              Your team has been successfully registered!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeamRegistration;
