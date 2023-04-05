import React, { useState } from "react";
import ClhEdwApi from "../ClhEdwApi";

const AuthenticateComponent = ({ onToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const authenticate = async () => {
        try {
            const response = await ClhEdwApi.post("/Auth/authenticate", {
                username,
                password,
            });
            const token = response.data.authToken;
            console.log("Token received", token);
            onToken(token);
        } catch (error) {
            console.error("error during authentication", error);
        }
    };

    return (
        <div>
            <h1>Authenticate</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={authenticate}>Authenticate</button>
        </div>
    );
};

export default AuthenticateComponent;
