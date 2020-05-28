import React from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}, appProps = {}) => (
    <Route {...rest} render={props => {
        if (appProps.condition) {
            return <Component {...props} />
        }
        else {
            return <Redirect to={
                {
                    pathname: "/login",
                    state: {
                        from: props.location
                    }
                }}/>
        }
    }}/>
);

export default PrivateRoute;