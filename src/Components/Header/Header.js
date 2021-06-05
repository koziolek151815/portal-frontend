import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Button} from "react-bootstrap";
import {isLoggedIn, logout} from "../../Utility/Authorization";

function AlertComponent(props) {
    const [value, setValue] = useState(0);

    const logoutButtonClicked = (event)=>{
        event.preventDefault();
        logout();
        setValue(value => value + 1);
    }

    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="home">Home</Nav.Link>
                    <Nav.Link href="chat">Chat</Nav.Link>
                </Nav>

                <Nav className="ml-auto">
                    {
                        isLoggedIn()?
                            <Button onClick={logoutButtonClicked}>Logout</Button>:
                            <Nav.Link href="login">Login</Nav.Link>
                    }

                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default AlertComponent
