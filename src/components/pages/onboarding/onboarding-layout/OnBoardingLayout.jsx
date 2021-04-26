import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ForgotPaswordComponent from '../forgot-password/ForgotPasswordComponent';
import LoginComponent from '../login/LoginPageComponent';
import RegisterComponent from '../register/RegisterComponent';
import './onboarding.styles.scss';

export const OnBoardingLayout = () => {
    return (
        <Router forceRefresh={true}>
                <Switch>
                    <Route exact path='/user/login' component={LoginComponent} />
                    <Route exact path='/user/register' component={RegisterComponent} />
                    <Route exact path='/user/forgotpassword' component={ForgotPaswordComponent} />
                </Switch>

        </Router>
    )
}


export default OnBoardingLayout;