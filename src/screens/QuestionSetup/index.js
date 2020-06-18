import React, { useState, useEffect, useRef, useContext } from 'react';

import Load from '../Load';
import { QuestionContext } from '../../Context/QuestionContext';
import history from '../../history';

import './styles.css';
import logo from '../../images/asking-the-dev.png';

const QuestionSetup = () => {
    const loadingScreen = useRef(null);


    const {
        questions, 
        setQuestions,
        completedQuestions,
        setCompletedQuestions,
        handleBegin, 
        difficulty, 
        handleSelectDifficulty, 
        loading, 
        setLoading
    } = useContext(QuestionContext);
    
    useEffect(() => {
        // if (completedQuestions.length > 0 && completedQuestions.length < 10) {
        //     history.push('/question');
        // }
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("loading end");
            loadingScreen.current.style.display = "none";
            // history.push('/question');
            return;
        }
        console.log("loading...");
        loadingScreen.current.style.display = "flex";
    }, [loading]);

    return (
        <form className="set-question">
            <img className="logo" src={logo} alt="Asking the Dev logo" />
                <h1>Select a difficulty:</h1>
                <select onChange={handleSelectDifficulty} value={difficulty} name="difficulty" className="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    
                </select>

            <div 
                className="loading" 
                style={{ display: 'none' }} 
                ref={loadingScreen}
            >
                <Load />
            </div>

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