import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';

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
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="npi">
                    <Form.Label>NPI</Form.Label>
                    <Input value={npi} onChange={(e) => setNpi(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {parties.length > 0 && (
                <Grid
                    data={parties}
                    sortable={true}
                    filterable={true}
                    pageable={true}
                >
                    <Column field="partyId" title="Party ID" />
                    <Column field="name" title="Name" />
                    <Column field="partyNumber" title="Party Number" />
                    <Column field="address" title="Address" />
                    <Column field="active" title="Active" />
                    <Column
                        field="policyNumbers"
                        title="Policies"
                        cell={(props) => {
                            return props.dataItem.policyNumbers.join(", ");
                        }}
                    />
                </Grid>
            )}
        </div>
    );
};

export default PartySearchComponent;
