import React, {useState} from 'react';
import axios from 'axios';
import jwt from 'jwt-decode'
import { withRouter } from "react-router-dom";


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email":state.email,
            "password":state.password,
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + '/users/authenticate', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("token", response.data['token']);
                    console.log(localStorage.getItem("token"));
                    const decoded = jwt(localStorage.getItem('token'));
                    localStorage.setItem("roles", decoded['roles']);
                    console.log(localStorage.getItem('roles'));
                    redirectToHome();
                    props.showError(null)
                }

            })
            .catch(function (error) {
                props.showError("Invalid credentials");
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
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
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>

        </div>
    )
}

export default withRouter(LoginForm);
