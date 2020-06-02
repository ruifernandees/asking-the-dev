import React from 'react';

import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from './screens/Home';
import Question from './screens/Question';

import './reset.css'

const App = () => (
    <BrowserRouter>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/question">Question</Link></li>
        </ul>
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route exact path='/question'>
                <Question />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;
