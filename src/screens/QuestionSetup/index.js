import React, { useState, useEffect, useRef, useContext } from 'react';

import Load from '../Load';
import { QuestionContext } from '../../Context/QuestionContext';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const QuestionSetup = () => {

    const {
        handleBegin, 
        difficulty, 
        handleSelectDifficulty, 
        loading
    } = useContext(QuestionContext);

    return (
        
        <form className="set-question">
            <img className="logo" src={logo} alt="Asking the Dev logo" />
                <h1>Select a difficulty:</h1>
                <select onChange={handleSelectDifficulty} value={difficulty} name="difficulty" className="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    
                </select>

                {loading && 
                    <div className="loading">
                        <Load />
                    </div>
                }
            
            <button type="submit" className="begin" onClick={handleBegin}>
                <span className="material-icons md-36">
                    play_arrow
                </span>
                Begin game
            </button>
        </form>
    );
};

export default QuestionSetup;