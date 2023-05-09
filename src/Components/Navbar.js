import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigationbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(); // Refresh the page after logging out
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#">Coverys</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/" className="nav-link" activeClassName="active">Coverages</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/party-search" className="nav-link" activeClassName="active">PartiesSearch</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <Button variant="danger" onClick={handleLogout}>Logout</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;
