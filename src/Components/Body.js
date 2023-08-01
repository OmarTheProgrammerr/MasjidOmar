import React from "react";
import { Link } from "react-router-dom";
import "./Body.css";

const Body = () => {
  return (
    <div className="body">
      <div>
        <h1 className="masjid">Masjid Omar Rules and Requirements</h1>
        <p className="intro">
          Welcome to the Masjid Omar Basketball Tournament platform! This
          website is your one-stop solution for everything related to the
          tournament. Here, you can create and manage your own team, view all
          the participating teams, track matches and their results, and most
          importantly, participate in the excitement of the tournament. We have
          built this platform with the aim to foster a friendly competitive
          spirit and to make the experience as seamless as possible for all
          participants. Let the games begin!
        </p>
        <div className="boxContainer">
          <Link to="/TeamRegistration" className="box">
            Team Registration
          </Link>
          <Link to="/Teams" className="box">
            Teams
          </Link>
        </div>
        <div className="separator2"></div>
      </div>
      <h1>Rules !</h1>
      <ul className="bulletPoint">
        <li>
          Each participant is allowed to register and create only one team for
          the tournament.
        </li>
        <li>
          Each team must consist of a minimum of 4 players and a maximum of 7
          players.
        </li>
        <li>
          Participants must meet any age or skill-level requirements outlined
          for the tournament.
        </li>
        <li>
          Players can only play for one team throughout the tournament.
          Transfers to other teams after registration are only allowed after
          contacting Neil Odeh.
        </li>

        <li>
          All teams and players are expected to conduct themselves with
          sportsmanship and respect for their opponents, referees, and
          spectators.
        </li>

        <li>
          The team captain is responsible for reporting the results of each
          match within an hour of the match's conclusion.
        </li>
        <li>
          Any disputes regarding games, rulings, or the conduct of other players
          should be raised with tournament organizers as soon as possible.
        </li>
        <li>
          Teams or players that wish to withdraw from the tournament must notify
          the organizers at the earliest.
        </li>
      </ul>
    </div>
  );
};

export default Body;
