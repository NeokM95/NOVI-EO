import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import AuthorizationContextProvider from "./context/AuthorizationContext";

import App from './App';

import './index.css';

ReactDOM.render(
    <Router>
        <AuthorizationContextProvider>
            <App/>
        </AuthorizationContextProvider>
    </Router>,
    document.getElementById( 'root' )
);

