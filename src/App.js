import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home';
import Quiz from './screens/Quiz';
import About from './screens/About';

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
                <Route exact path='/about'>
                    <About />
                </Route>
            </Switch>
        </BrowserRouter>
    </QuestionProvider>
);

export default App;
