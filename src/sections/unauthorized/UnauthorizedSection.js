import React, { useContext, useEffect } from 'react';

import { AuthorizationContext } from "../../context/AuthorizationContext";
import { HomeNavigation } from "../../components";
import { Route, Switch } from "react-router-dom";
import { AboutUs, FAQ, Home, Login } from "../../pages";
import Footer from "../../components/footer/Footer";

function UnauthorizedSection() {

    const {isAuthorized, toggleAuthorized} = useContext(AuthorizationContext);


    return (
        <>
            {!isAuthorized && <HomeNavigation/> }
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
            {!isAuthorized && <Footer/> }
        </>
    );
}

export default UnauthorizedSection;