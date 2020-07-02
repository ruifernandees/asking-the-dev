import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Quiz from './screens/Quiz';

import { QuestionProvider } from './Context/QuestionContext';

import './css/reset.css';

const App = () => (
    <QuestionProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/play'>
                    <Quiz />
                </Route>
            </Switch>
        </BrowserRouter>
    </QuestionProvider>
);

export default App;
