import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import {isLoggedIn} from "../Utility/Authorization";

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? (
                    <>{Component}</>
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute
