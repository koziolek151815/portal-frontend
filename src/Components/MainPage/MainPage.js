import React from "react";
import ScrollableAdView from "../ScrollableAdView/ScrollableAdView";
import {Button, Container, Row, Col} from "react-bootstrap";
import axios from "axios";



class MainPage extends React.Component{
    state = {
        userCount: "?"
    }

    updateCount() {
        axios.get(
            process.env.REACT_APP_BACKEND_URL + `/chat/userCount`,
        ).then((response)=>{
            this.setState({userCount: response.data.toString()})
            setTimeout(this.updateCount.bind(this), 1000);
        });

    }

    componentDidMount() {
        this.updateCount()
    }


    render() {
        return (
            <div>
                <Container className="my-1 pb-3">
                    <Row className="p-1">
                        <Col xs={12} md={6} className="p-1">
                            <h2>Welcome to our website!</h2>
                            Currently {this.state.userCount} people are chatting. <br/>
                            Press this button to talk to a random stranger.
                            <Button variant="primary" size="lg" block href="/chat">
                                Chat with a stranger!
                            </Button>
                        </Col>
                        <Col xs={12} md={6} className="p-1">
                            <h2>User ads:</h2>
                            <ScrollableAdView endpoint="ads" sort="id,DESC"/>
                        </Col>
                    </Row>
                </Container>

                <span className="footer fixed-bottom w-auto bg-dark text-white align-text-middle"
                      style={{height: "40px", padding: "7px"}}>
                Copyright &copy; Piotr Kozioł and Sebastian Korytkowski
            </span>
            </div>
        );
    }
}

export default MainPage;
