import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { withRouter } from "react-router-dom";


function RegistrationForm(props) {

    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length && state.username.length) {

            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
                "username": state.username
            }
            axios.post(process.env.REACT_APP_BACKEND_URL + '/users/register', payload)
                .then(function (response) {
                    console.log(response);
                    if(response.status === 201){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. You can go to login page'
                        }))
                        props.showError(null);
                    }

                    else if (response.status === 500){
                        console.log(response);
                        props.showError("Registration failed");
                    }
                    else{
                        console.log(response);
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log("Email taken");
                    props.showError("Registration failed");

                });
        } else {
            props.showError('Please enter not null username, email and password')
        }

    }
    const redirectToLogin = () => {
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        var error = false;
        if(!(state.password === state.confirmPassword)) {
            props.showError('Passwords do not match');
            error = true;
        }

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!state.email.match(mailformat)){
            props.showError('Email is not valid');
            error = true;
        }
        if(!(state.password.length > 4)){
            props.showError('Password is too short');
            error = true;
        }
        if(!(state.username.length > 4)){
            props.showError('Username is too short');
            error = true;
        }
        if (!error){
            sendDetailsToServer()
        }
    }
    return(
        <div className="card mt-3 p-3" style={{width:"500px", marginLeft:"auto", marginRight:"auto", height:"auto"}}>
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input className="form-control"
                           type="text"
                           id="username"
                           placeholder="Username"
                           value={state.username}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);
