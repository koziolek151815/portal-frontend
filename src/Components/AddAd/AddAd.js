import React from "react";
import axios from "axios";
import './AddAd.css';
import {Button} from "react-bootstrap";


class AddAd extends React.Component {
    state = {
        description: ''
    };

    constructor(props) {
        super(props);

        this.submitButtonRef = React.createRef();
        this.token = localStorage.getItem('token');
        this.minDescriptionLength = 1;
        this.maxDescriptionLength = 1000;
    }

    handleDescriptionChange = (event) => {
        this.setState(state => ({description: event.target.value}))
    };

    sendPostCreationRequest = () => {
        let link = process.env.REACT_APP_BACKEND_URL + '/ads';
        //Disable button not to send multiple posts
        this.submitButtonRef.current.disabled = true;

        axios.post(link, {content: this.state.description},
            {headers: {"Authorization": `Bearer ${this.token}`}})
            .then((response) => {
                window.location.replace('/home');
            })
            .catch((error) => {
                this.submitButtonRef.current.disabled = false;

            });
    };


    addPost = (event) => {
        event.preventDefault();
        var error = false;
        if (this.state.description.length < this.minDescriptionLength) {
            this.props.showError('Write something');
            error = true;
        }
        if (this.state.description.length > this.maxDescriptionLength) {
            this.props.showError(`Content is too long! (${this.state.description.length }/${this.maxDescriptionLength} characters)`);
            error = true;
        }
        if (!error) {
            this.sendPostCreationRequest();
        }
    };


    render() {
        return (
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2">
                    <h3>Write a new ad!</h3>
                    <form>
                        <textarea id={"description"} value={this.description} placeholder={"Write something"}
                                  onChange={this.handleDescriptionChange}/>
                        <Button ref={this.submitButtonRef} className="float-right" onClick={this.addPost}>Submit</Button>
                        <div style={{clear:"both"}}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAd;
