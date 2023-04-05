import React, { useState } from "react";
import AuthenticateComponent from "./Components/AuthenticateComponent";
import CoveragesComponent from "./Components/CoveragesComponent";

function App() {
    const [token, setToken] = useState("");

    return (
        <div className="App">
            {!token ? (
                <AuthenticateComponent onToken={setToken} />
            ) : (
                <CoveragesComponent token={token} />
            )}
        </div>
    );
}

export default App;
