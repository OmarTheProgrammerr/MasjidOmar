import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import AboutUs from "./Components/AboutUs";
import TeamRegistration from "./Components/TeamRegistration";
import Teams from "./Components/Teams";
import ContactUs from "./Components/ContactUs";
import Donation from "./Components/Donation";
import Dropdown from "./Components/Dropdown";
import Footer from "./Components/Footer";

function App() {
  const [teams, setTeams] = useState([]);

  const handleTeamRegistration = (team) => {
    setTeams((prevTeams) => [...prevTeams, team]);
  };

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Dropdown />
                  <Body />
                </>
              }
            />
            <Route
              path="/TeamRegistration"
              element={<TeamRegistration onRegister={handleTeamRegistration} />}
            />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Teams" element={<Teams teams={teams} />} />
            <Route path="/Donation" element={<Donation />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
