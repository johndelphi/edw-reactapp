import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticateComponent from "./Components/AuthenticateComponent";
import Navigationbar from "./Components/Navbar";
import CoveragesComponent from "./Components/CoveragesComponent";
import PartySearchComponent from "./Components/PartySearchComponent";

function App() {
  const [token, setToken] = useState(getStoredToken());

  function getStoredToken() {
    const storedToken = localStorage.getItem("token");
    return storedToken || "";
  }

  function renderContent() {
    if (token) {
      return (
        <Router>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<CoveragesComponent token={token} />} />
            <Route path="/party-search" element={<PartySearchComponent />} />
          </Routes>
        </Router>
      );
    } else {
      return <AuthenticateComponent onToken={setToken} />;
    }
  }

  return <div className="App">{renderContent()}</div>;
}

export default App;
