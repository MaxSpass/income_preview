import React from 'react';
import {Route} from 'react-router-dom';
import LoginForm from "../form/Login"
import RegistrationForm from "../form/Registration"
import ParticlesAnimation from "../../components/animation/Particles";
import {Card} from "@material-ui/core";

//@TODO - <Route path="*" component={LoginForm} />

const LoginIndex = () => {
    return(
        <React.Fragment>
            <ParticlesAnimation />
            <div className="position-relative align-self-baseline mx-auto w-100" style={{maxWidth: 460, top: "20%"}}>
                <Card className="p-4 d-flex flex-column align-content-center">
                    <Route path="/login" component={LoginForm} />
                    <Route path="/registration" component={RegistrationForm} />
                    {/*<Route path="*" component={LoginForm} />*/}
                </Card>
            </div>
        </React.Fragment>
    )
};


export default LoginIndex;