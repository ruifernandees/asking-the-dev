import React from 'react';

import RadioButton from './RadioButton';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo"/>
            <h1>What does CSS stand for?</h1>

            <div className="cards">
                <div className="card">
                    <RadioButton />
                    <p>Computing Style Sheet</p>    
                </div>
                <div className="card">
                    <RadioButton />
                    <p>Cascading Style Sheet</p>    
                </div>
                <div className="card">
                    <RadioButton />
                    <p>Colorful Style Sheet</p>    
                </div>
                <div className="card">
                    <RadioButton />
                    <p>Creative Style Sheet</p>    
                </div>
            </div>

            <button>Send</button>
        </section>
    );
};

export default Question;