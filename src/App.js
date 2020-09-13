import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import useStyles from './classes/index';
import {CssBaseline} from "@material-ui/core";
import Account from "./templates/dashboard/Account";
import LoginIndex from "./components/auth/LoginIndex";
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import UnAuthenticatedRoute from './components/auth/UnAuthenticatedRoute';
import {userProfileThunk} from './store/reducers/auth/auth.reducer';
import {NOTIFY_CONTAINER_PROPS} from './store/reducers/notify/notify.reducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import PrivateRoute from './components/auth/PrivateRoute';

// function NotFound() {
//     return (
//         <h1>NOT FOUND</h1>
//     )
// }

//@TODO Refactor redirect auth logic
function App(props) {
    const classes = useStyles();
    const wrapperStyle = "greenAndBlue"; // miaka, anamnisar, greenAndBlue, miamiDolphins, slightOceanView, dull

    React.useEffect(() => {
        props.getProfile();
    },// eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    return (
        //@TODO Remove /login redirect
        <div className={[classes.root, wrapperStyle].join(' ')}>
            <CssBaseline />
            <ToastContainer {...NOTIFY_CONTAINER_PROPS} />
            <Router>
                {
                    props.isAuth
                        ? <Switch>
                            <AuthenticatedRoute
                                path="/dashboard"
                                component={Account}
                                appProps={{ isAuth: props.isAuth }}
                            />
                            <AuthenticatedRoute
                                path="/users"
                                component={Account}
                                appProps={{ isAuth: props.isAuth }}
                            />
                            <AuthenticatedRoute
                                path="/reports"
                                component={Account}
                                appProps={{ isAuth: props.isAuth }}
                            />
                            <Route exact path='*' render={()=><Redirect to="/dashboard" />}/>
                        </Switch>
                        : <Switch>
                            <UnAuthenticatedRoute
                                path={'/login'}
                                component={LoginIndex}
                                appProps={{ isAuth: props.isAuth }}
                            />
                            <UnAuthenticatedRoute
                                path={'/registration'}
                                component={LoginIndex}
                                appProps={{ isAuth: props.isAuth }}
                            />
                            <Route exact path='*' render={()=><Redirect to="/login" />}/>
                        </Switch>
                }
            </Router>
        </div>
    )
}

const mapStateToProps = state => {
  return {
      isAuth: state.auth.isAuth,
      isLoadingProfile: state.auth.isLoading,
      activeNotifies: state.notify.activeNotifies,
  }
};

const mapDispatchToProps = dispatch => ({
    getProfile: ()=> dispatch(userProfileThunk()),
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
