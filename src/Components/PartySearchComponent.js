import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

import ClhEdwApi from "../ClhEdwApi";

const PartySearchComponent = () => {
    const [name, setName] = useState("");
    const [npi, setNpi] = useState("");
    const [parties, setParties] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await ClhEdwApi.post(
                "/v2/EDWData/Parties",
                { name, npi },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setParties(response.data);
        } catch (error) {
            console.error("Error searching parties", error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSearch} className="m-5">
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="npi">
                    <Form.Label>NPI</Form.Label>
                    <Form.Control
                        type="text"
                        value={npi}
                        onChange={(e) => setNpi(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {parties.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Party ID</th>
                            <th>Name</th>
                            <th>Party Number</th>
                            <th>Address</th>
                            <th>Active</th>
                            <th>Policies</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parties.map((party) => (
                            <tr key={party.partyId}>
                                <td>{party.partyId}</td>
                                <td>{party.name}</td>
                                <td>{party.partyNumber}</td>
                                <td>{party.address}</td>
                                <td>{party.active ? "Yes" : "No"}</td>
                                <td>{party.policyNumbers.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default PartySearchComponent;
