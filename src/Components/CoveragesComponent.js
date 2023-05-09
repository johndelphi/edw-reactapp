import React, { useState, useEffect, useCallback } from "react";
import ClhEdwApi from "../ClhEdwApi";
import "./CoveragesComponent.css";
import Navigationbar from "./Navbar";
import { Navbar, Nav, Button } from "react-bootstrap";


const CoveragesComponent = ({ token }) => {
    console.log("Token in CoveragesComponent:", token);
    const [coverages, setCoverages] = useState([]);
    const [partyNumber, setPartyNumber] = useState("639458");
    const [yearsBack, setYearsBack] = useState(100);

    const fetchData = useCallback(async () => {
        if (token) {
            try {
                const response = await ClhEdwApi.post(
                    "/EDWData/coverages",
                    {
                        partyNumber,
                        yearsBack,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCoverages(response.data.data);
            } catch (error) {
                console.error("Error fetching coverages", error);
            }
        }
    }, [token, partyNumber, yearsBack]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh the page after logging out
    };
    return (
        <div>
            <Navigationbar />


            <h1>Coverages</h1>

            <input

                type="text"
                placeholder="Party Number"
                value={partyNumber}
                onChange={(e) => setPartyNumber(e.target.value)}
            />
            <input
                type="number"
                placeholder="Years Back"
                value={yearsBack}
                onChange={(e) => setYearsBack(e.target.value)}
            />
            <table className="coverages-table">
                <thead>
                    <tr>
                        <th>Policy Number</th>
                        <th>Covered From</th>
                        <th>Covered To</th>
                        <th>Policy Holder</th>
                    </tr>
                </thead>
                <tbody>
                    {coverages.map((coverage, index) => (
                        <tr key={index}>
                            <td>{coverage.policyNumber}</td>
                            <td>{coverage.coveredFrom}</td>
                            <td>{coverage.coveredTo}</td>
                            <td>{coverage.policyHolder}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default CoveragesComponent;
