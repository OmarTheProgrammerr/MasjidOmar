import React, { useEffect, useState } from "react";
import "./Teams.css";
import { Link } from "react-router-dom";
import { PiMosqueLight } from "react-icons/pi";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("https://git.heroku.com/masjid-omar.git/teams")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // log the data here
        setTeams(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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
        {teams.map((team, index) => (
          <div key={index} className="team">
            <h3>{team.teamName}</h3>
            <ul>
              {team.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
