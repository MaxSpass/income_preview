import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default ({ component: Component, appProps, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                !appProps.isAuth
                    ? <Component {...props} {...appProps} />
                    : <Redirect to="/" />}
        />
    )
}