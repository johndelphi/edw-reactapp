import React, { useState } from "react";
import AuthenticateComponent from "./Components/AuthenticateComponent";
import CoveragesComponent from "./Components/CoveragesComponent";

function App() {

  const [token, setToken] = useState(getStoredToken());

  function getStoredToken() {
    const storedToken = localStorage.getItem("token");
    return storedToken || "";
  }

  function renderContent() {
    if (token) {
      return <CoveragesComponent token={token} />;
    } else {
      return <AuthenticateComponent onToken={setToken} />;
    }
  }

  return <div className="App">{renderContent()}</div>;
}

export default App;
