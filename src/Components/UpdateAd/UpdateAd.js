import React from "react";
import axios from "axios";
import './UpdateAd.css';
import {withRouter} from "react-router-dom";
import jwt from "jwt-decode";
import {Button} from "react-bootstrap";


class UpdateAd extends React.Component {
    state = {
        description: '',
        enableEdit: false
    };

    constructor(props) {
        super(props);
        this.submitButtonRef = React.createRef();
        this.textAreaRef = React.createRef();
        this.token = localStorage.getItem('token');
        this.minDescriptionLength = 1;
        this.maxDescriptionLength = 1000;
        if (localStorage.getItem('token')) {
            this.currentUser = jwt(localStorage.getItem('token'))['sub'];
        }
    }

    componentDidMount() {
        this.getDataFromApi().then(response => {
            this.setState(state => ({description: response.data.content}));

            if (this.currentUser === response.data.user.email) {
                this.setState(state => ({enableEdit: true}));
                this.textAreaRef.current.placeholder = response.data.content;
            }
        });

    }

    handleDescriptionChange = (event) => {
        this.setState(state => ({description: event.target.value}))
    };

    getDataFromApi = async (page) => {
        return await axios.get(
            process.env.REACT_APP_BACKEND_URL + '/ads/' + this.props.match.params.id,
            {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        )
    };

    sendPostCreationRequest = () => {
        let link = process.env.REACT_APP_BACKEND_URL + '/ads/' + this.props.match.params.id;
        //Disable button not to send multiple posts
        this.submitButtonRef.current.disabled = true;

        axios.put(link, {content: this.state.description},
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
            this.props.showError('Write something!');
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
                    {this.state.enableEdit ? <>
                        <h4>Editing your ad</h4>
                        <form>
                        <textarea ref={this.textAreaRef} id={"description"} value={this.state.description}
                                  placeholder={this.state.description}
                                  onChange={this.handleDescriptionChange}/>
                            <Button ref={this.submitButtonRef} className="float-right" onClick={this.addPost}>Submit</Button>
                            <div style={{clear:"both"}}/>
                        </form>
                    </> : <h1>You cannot edit this</h1>}
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateAd);
