import React, { useContext } from 'react';

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { HomeNavigation } from "../../components";
import { Route, Switch } from "react-router-dom";
import { AboutUs, FAQ, Home, Login } from "../../pages";

function UnauthorizedSection() {

    const {isAuthorized} = useContext(AuthorizationContext);
    return (
        <div>
            {!isAuthorized && <HomeNavigation/>}
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/about-us">
                    <AboutUs/>
                </Route>
                <Route path="/FAQ">
                    <FAQ/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </div>
    );
}

export default UnauthorizedSection;