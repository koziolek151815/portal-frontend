import React from "react";
import axios from "axios";
import './AddAd.css';


class AddAd extends React.Component {
    state = {
        description: ''
    };

    constructor(props) {
        super(props);

        this.submitButtonRef = React.createRef();
        this.token = localStorage.getItem('token');
        this.minDescriptionLength = 5;
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
            this.props.showError('Description is too short!');
            error = true;
        }
        if (!error) {
            this.sendPostCreationRequest();
        }
    };


    render() {
        return (
            <div className="Post container my-2 border rounded">
                <div className="col-md-12 py-2 blogShort">
                    <h1>Write new ad. Tell sth about yourself!!!</h1>
                    <form>
                        <textarea id={"description"} value={this.description} placeholder={"Write something"}
                                  onChange={this.handleDescriptionChange}/>
                        <button ref={this.submitButtonRef} className={"btn btn-default text-white bg-dark float-right"}
                                id="addPostButton" onClick={this.addPost}>Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAd;
