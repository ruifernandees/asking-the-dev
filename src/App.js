import React from 'react';

import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Home from './screens/Home';
import Question from './screens/Question';
import QuestionSetup from './screens/QuestionSetup';
import { QuestionProvider } from './Context/QuestionContext';
import history from './history';

import './css/reset.css';

const App = () => (
    <QuestionProvider>
        <Router history={history}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/question">Question</Link></li>
                <li><Link to="/set-questions">QuestionSetup</Link></li>
            </ul>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/question'>
                    <Question />
                </Route>
                <Route exact path='/set-questions'>
                    <QuestionSetup />
                </Route>
            </Switch>
        </Router>
    </QuestionProvider>
);

export default App;
