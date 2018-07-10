import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Routes
import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import HomePage from './Home';
import Watch from './Watch';

import * as routes from '../constants/routes';

import './App.css';

import withAuthentication from './withAuthentication';

class App extends Component {
  render() {
    return (
        <div className="App">
            <header className="App-header">
                <Router>
                    <div>
                    
                        <Navigation />

                        <Route
                        exact path={routes.LANDING}
                        component={() => <LandingPage />}
                        />
                        <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUpPage />}
                        />
                        <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignInPage />}
                        />
                        <Route
                        exact path={routes.HOME}
                        component={() => <HomePage />}
                        />
                        <Route
                        path={routes.WATCH}
                        component={() => <Watch />}
                        />
                    </div>
                </Router>
            </header>
        </div>
    );
  }
}

export default withAuthentication(App);