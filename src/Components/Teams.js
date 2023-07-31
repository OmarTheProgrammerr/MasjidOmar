// Teams.js
import React from "react";
import "./Teams.css";
import { Link } from "react-router-dom";
import { PiMosqueLight } from "react-icons/pi";

const Teams = (props) => {
  return (
    <div>
      <div className="logo2">
        <Link to="/">
          <PiMosqueLight />
          Masjid Omar
        </Link>
      </div>
      <div className="teams">
        <h2>Registered Teams</h2>
        {props.teams.map((team, index) => (
          <div key={index} className="team">
            <h3>{team.teamName}</h3>
            <ul>
              {team.players.map(
                (player, index) => player && <li key={index}>{player}</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
