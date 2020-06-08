import React, { useState } from 'react';

import RadioButton from './RadioButton';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(0);

    return (
        <section className="question">
            <img className="logo" src={logo} alt="Asking the Dev logo"/>
            <h1>What does CSS stand for?</h1>

            <div className="cards">
                <div className="card selected" key="1" onPress={() => {}}>
                    <RadioButton />
                    <p>Computing Style Sheet</p>    
                </div>
                <div className="card" key="2">
                    <RadioButton />
                    <p>Cascading Style Sheet</p>    
                </div>
                <div className="card" key="3">
                    <RadioButton />
                    <p>Colorful Style Sheet</p>    
                </div>
                <div className="card" key="4">
                    <RadioButton />
                    <p>Creative Style Sheet</p>    
                </div>
            </div>

            <button>Send</button>
        </section>
    );
};

export default Question;