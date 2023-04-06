import React, { useState } from "react";
import ClhEdwApi from "../ClhEdwApi";
import "bootstrap/dist/css/bootstrap.css";



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
            localStorage.setItem("token", token);
            onToken(token);

        } catch (error) {
            console.error("error during authentication", error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Authenticate</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary mt-2" onClick={authenticate}>
                                        Authenticate
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AuthenticateComponent;
