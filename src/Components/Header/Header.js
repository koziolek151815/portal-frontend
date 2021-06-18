import React, {useState, useEffect} from 'react';
import {Navbar, Nav, Button} from "react-bootstrap";
import {removeOnChangeLoginListener, addOnChangeLoginListener, isLoggedIn, logout} from "../../Utility/Authorization";

class Header extends React.Component  {
    state = {
        loggedIn: isLoggedIn()
    }

    constructor(props) {
        super(props);

        this.updateLoggedInStatus = this.updateLoggedInStatus.bind(this);
    }

    updateLoggedInStatus(value)
    {
        this.setState({loggedIn: value})
    }

    componentDidMount() {
        addOnChangeLoginListener(this.updateLoggedInStatus)
    }

    componentWillUnmount() {
        removeOnChangeLoginListener(this.updateLoggedInStatus)
    }

    render()
    {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="home">Meetup</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/chat">Chat</Nav.Link>

                        {
                            isLoggedIn() ?
                                <Nav.Link href="/addAd">New ad</Nav.Link> :
                                null
                        }
                    </Nav>

                    <Nav className="ml-auto">
                        {
                            isLoggedIn() ?
                                <Button onClick={logout}>Logout</Button> :
                                <Nav.Link href="/login">Login</Nav.Link>
                        }

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header
