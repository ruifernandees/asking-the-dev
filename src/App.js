import React from 'react';

import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from './screens/Home';
import Quiz from './screens/Quiz';

import { QuestionProvider } from './Context/QuestionContext';
import history from './history';

import './css/reset.css';

const App = () => (
    <QuestionProvider>
        <Router history={history}>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/play'>
                    <Quiz />
                </Route>
            </Switch>
        </Router>
    </QuestionProvider>
);

export default App;
